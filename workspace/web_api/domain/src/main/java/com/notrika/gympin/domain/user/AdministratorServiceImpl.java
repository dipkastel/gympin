package com.notrika.gympin.domain.user;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.enums.UserGroup;
import com.notrika.gympin.common.user.enums.UserRole;
import com.notrika.gympin.common.user.enums.UserStatus;
import com.notrika.gympin.common.user.param.UserParam;
import com.notrika.gympin.common.user.param.UserRoleParam;
import com.notrika.gympin.common.user.service.AdministratorService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.UserConvertor;
import com.notrika.gympin.persistence.dao.repository.PasswordRepository;
import com.notrika.gympin.persistence.entity.user.Password;
import com.notrika.gympin.persistence.entity.user.Role;
import com.notrika.gympin.persistence.entity.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdministratorServiceImpl extends AbstractBaseService<UserParam, UserDto, BaseFilter<?>, User> implements AdministratorService {

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private PasswordRepository passwordRepository; //todo: create service

    @Autowired
    private UserRoleServiceImpl userRoleService;

    @Override
    @CacheEvict("admin")
    public UserDto add(UserParam administratorParam) {
        List<Role> roles = new ArrayList<>();
        for (UserRoleParam roleParam : administratorParam.getRole()) {
            roles.add(userRoleService.getEntityById(roleParam.getId()));
        }
        if (roles.size() == 0) {
            roles.add(userRoleService.getByUserRole(UserRole.ADMIN));
        }
        User initAdministrator =
                User.builder().username(administratorParam.getUsername()).phoneNumber(administratorParam.getPhoneNumber()).userGroup(UserGroup.ADMINISTRATION).userStatus(UserStatus.ENABLED).userRole(roles).build();
        User administrator = add(initAdministrator);
        Password password = Password.builder().user(administrator).password(passwordEncoder.encode(administratorParam.getPassword())).expired(false).build();
        passwordRepository.add(password);
        return UserConvertor.administratorToAdministratorDto(userService.add(administrator));
    }

    @Override
    @CacheEvict("admin")
    public User add(User administrator) {
        return userService.add(administrator);
    }

    @Override
    @Transactional
    @CacheEvict("admin")
    public UserDto update(UserParam administratorParam) {
        List<Role> roles = new ArrayList<>();
        for (UserRoleParam roleParam : administratorParam.getRole()) {
            roles.add(userRoleService.getEntityById(roleParam.getId()));
        }
        User admin = userService.getEntityById(administratorParam.getId());
        admin.setUserRole(roles);
        admin.setUsername(administratorParam.getUsername());
        admin.setPhoneNumber(administratorParam.getPhoneNumber());
        admin.setName(administratorParam.getName());
        admin.setLastname(administratorParam.getLastname());
        admin.setBirthday(administratorParam.getBirthday());
        admin.setNationalCode(administratorParam.getNationalCode());
        admin.setEmail(administratorParam.getEmail());
        User administrator = userService.update(admin);
        return UserConvertor.administratorToAdministratorDto(administrator);
    }

    @Override
    @CacheEvict("admin")
    public User update(User entity) {
        return null;
    }

    @Override
    @CacheEvict("admin")
    public UserDto delete(UserParam userParam) {
        return userService.delete(userParam);
    }

    @Override
    @CacheEvict("admin")
    public User delete(User entity) {
        return null;
    }

    @Override
    public List<User> getAll(Pageable pageable) {
        return userService.getAll(pageable);
    }

    @Override
    public List<UserDto> convertToDtos(List<User> entities) {
        return UserConvertor.administratorsToAdministratorDtos(entities);
    }

    @Override
    public UserDto getById(long id) {
        User administrator = userService.getEntityById(id);
        return UserConvertor.administratorToAdministratorDto(administrator);
    }

    @Override
    public User getEntityById(long id) {
        return null;
    }

}
