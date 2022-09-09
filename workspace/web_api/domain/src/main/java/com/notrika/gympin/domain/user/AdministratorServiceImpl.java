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
import com.notrika.gympin.persistence.entity.user.PasswordEntity;
import com.notrika.gympin.persistence.entity.user.RoleEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdministratorServiceImpl extends AbstractBaseService<UserParam, UserDto, BaseFilter<?>, UserEntity> implements AdministratorService {

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
        List<RoleEntity> roles = new ArrayList<>();
        for (UserRoleParam roleParam : administratorParam.getRole()) {
            roles.add(userRoleService.getEntityById(roleParam.getId()));
        }
        if (roles.size() == 0) {
            roles.add(userRoleService.getByUserRole(UserRole.ADMIN));
        }
        UserEntity initAdministrator =
                UserEntity.builder().username(administratorParam.getUsername()).phoneNumber(administratorParam.getPhoneNumber()).userGroup(UserGroup.ADMINISTRATION).userStatus(UserStatus.ENABLED).userRole(roles).build();
        UserEntity administrator = add(initAdministrator);
        PasswordEntity password = PasswordEntity.builder().user(administrator).password(passwordEncoder.encode(administratorParam.getPassword())).expired(false).build();
        passwordRepository.add(password);
        return UserConvertor.administratorToAdministratorDto(userService.add(administrator));
    }

    @Override
    @CacheEvict("admin")
    public UserEntity add(UserEntity administrator) {
        return userService.add(administrator);
    }

    @Override
    @Transactional
    @CacheEvict("admin")
    public UserDto update(UserParam administratorParam) {
        List<RoleEntity> roles = new ArrayList<>();
        for (UserRoleParam roleParam : administratorParam.getRole()) {
            roles.add(userRoleService.getEntityById(roleParam.getId()));
        }
        UserEntity admin = userService.getEntityById(administratorParam.getId());
        admin.setUserRole(roles);
        admin.setUsername(administratorParam.getUsername());
        admin.setPhoneNumber(administratorParam.getPhoneNumber());
        admin.setName(administratorParam.getName());
        admin.setLastname(administratorParam.getLastname());
        admin.setBirthday(administratorParam.getBirthday());
        admin.setNationalCode(administratorParam.getNationalCode());
        admin.setEmail(administratorParam.getEmail());
        UserEntity administrator = userService.update(admin);
        return UserConvertor.administratorToAdministratorDto(administrator);
    }

    @Override
    @CacheEvict("admin")
    public UserEntity update(UserEntity entity) {
        return null;
    }

    @Override
    @CacheEvict("admin")
    public UserDto delete(UserParam userParam) {
        return userService.delete(userParam);
    }

    @Override
    @CacheEvict("admin")
    public UserEntity delete(UserEntity entity) {
        return null;
    }

    @Override
    public List<UserEntity> getAll(Pageable pageable) {
        return userService.getAll(pageable);
    }

    @Override
    public List<UserDto> convertToDtos(List<UserEntity> entities) {
        return UserConvertor.administratorsToAdministratorDtos(entities);
    }

    @Override
    public UserDto getById(long id) {
        UserEntity administrator = userService.getEntityById(id);
        return UserConvertor.administratorToAdministratorDto(administrator);
    }

    @Override
    public UserEntity getEntityById(long id) {
        return null;
    }

}
