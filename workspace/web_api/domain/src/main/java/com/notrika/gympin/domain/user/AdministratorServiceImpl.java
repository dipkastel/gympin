package com.notrika.gympin.domain.user;

import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.enums.UserGroup;
import com.notrika.gympin.common.user.enums.UserStatus;
import com.notrika.gympin.common.user.param.UserParam;
import com.notrika.gympin.common.user.service.AdministratorService;
import com.notrika.gympin.domain.util.convertor.UserConvertor;
import com.notrika.gympin.persistence.dao.repository.PasswordRepository;
import com.notrika.gympin.persistence.entity.user.Password;
import com.notrika.gympin.persistence.entity.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdministratorServiceImpl implements AdministratorService {

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private PasswordRepository passwordRepository;

    @Override
    public UserDto add(UserParam administratorParam) {
        User initAdministrator = User.builder()
                .username(administratorParam.getUsername())
                .phoneNumber(administratorParam.getPhoneNumber())
                .userGroup(UserGroup.ADMINISTRATION)
                .userStatus(UserStatus.ENABLED)
//                .password(password)
                .build();
        User administrator = addAdministrator(initAdministrator);
        Password password=Password.builder().password(passwordEncoder.encode(administratorParam.getPassword())).expired(false).build();
        passwordRepository.add(password);
        return UserConvertor.administratorToAdministratorDto(userService.addUser(administrator));
    }

    public User addAdministrator(User administrator) {
        return userService.addUser(administrator);
    }

    @Override
    public UserDto update(UserParam administratorParam) {
        Password password=Password.builder().password(passwordEncoder.encode(administratorParam.getPassword())).expired(false).build();
        User initAdministrator = userService.getUserById(administratorParam.getId());
//        initAdministrator.setUserRole(administratorParam.getRole());
        initAdministrator.setUsername(administratorParam.getUsername());
        initAdministrator.setPhoneNumber(administratorParam.getPhoneNumber());
//        initAdministrator.setPassword(password);
        initAdministrator.setEmail(administratorParam.getEmail());
        User administrator = userService.updateUser(initAdministrator);
        return UserConvertor.administratorToAdministratorDto(administrator);
    }

    @Override
    public UserDto delete(UserParam userParam) {
        return userService.delete(userParam);
    }

    @Override
    public List<UserDto> getAll() {
        return userService.getAll();
    }

    @Override
    public UserDto getById(long id) {
        User administrator = userService.getUserById(id);
        return UserConvertor.administratorToAdministratorDto(administrator);
    }

}
