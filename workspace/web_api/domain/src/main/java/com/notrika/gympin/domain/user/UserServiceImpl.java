package com.notrika.gympin.domain.user;

import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.enums.UserGroup;
import com.notrika.gympin.common.user.enums.UserRole;
import com.notrika.gympin.common.user.enums.UserStatus;
import com.notrika.gympin.common.user.param.UserParam;
import com.notrika.gympin.common.user.param.UserRoleParam;
import com.notrika.gympin.common.user.service.UserService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.UserConvertor;
import com.notrika.gympin.persistence.dao.repository.PasswordRepository;
import com.notrika.gympin.persistence.dao.repository.RoleRepository;
import com.notrika.gympin.persistence.dao.repository.UserRepository;
import com.notrika.gympin.persistence.entity.location.Place;
import com.notrika.gympin.persistence.entity.user.Password;
import com.notrika.gympin.persistence.entity.user.Role;
import com.notrika.gympin.persistence.entity.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl extends AbstractBaseService<UserParam, UserDto,User> implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private PasswordRepository passwordRepository;

    @Autowired
    private UserRoleServiceImpl userRoleService;

    @Override
    public UserDto add(UserParam userParam) {
        List<Role> roles=new ArrayList<>();
        for (UserRoleParam roleParam : userParam.getRole()) {
            roles.add(userRoleService.getRoleById(roleParam.getId()));
        }
        if(roles.size()==0) {
            roles.add(userRoleService.getByUserRole(UserRole.USER));
        }
        User initUser =
                User.builder()
                        .name(userParam.getName())
                        .lastname(userParam.getLastname())
                        .username(userParam.getUsername())
                        .phoneNumber(userParam.getPhoneNumber())
                        .birthday(userParam.getBirthday())
                        .nationalCode(userParam.getNationalCode())
                        .email(userParam.getEmail())
                        .userGroup(UserGroup.CLIENT)
                        .userRole(roles)
                        .userStatus(UserStatus.ENABLED)
                        .build();
        User user = userRepository.add(initUser);
        Password password=Password.builder().user(user).password(passwordEncoder.encode(userParam.getPassword())).expired(false).build();
        passwordRepository.add(password);
        return UserConvertor.userToUserDto(user);
    }

    public User addUser(User user) {
        return userRepository.add(user);
    }

    @Override
    public UserDto update(UserParam userParam) {
        List<Role> roles=new ArrayList<>();
        for (UserRoleParam roleParam : userParam.getRole()) {
            roles.add(userRoleService.getRoleById(roleParam.getId()));
        }
        User initUser = getUserById(userParam.getId());
        initUser.setName(userParam.getName());
        initUser.setLastname(userParam.getLastname());
        initUser.setUsername(userParam.getUsername());
        initUser.setPhoneNumber(userParam.getPhoneNumber());
        initUser.setBirthday(userParam.getBirthday());
        initUser.setNationalCode(userParam.getNationalCode());
        initUser.setEmail(userParam.getEmail());
        initUser.setUserRole(roles);
        User user = updateUser(initUser);
        return UserConvertor.userToUserDto(user);
    }

    public User updateUser(User user) {
        return userRepository.update(user);
    }

    @Override
    public UserDto delete(UserParam userParam) {
        User user = getUserById(userParam.getId());
        User deletedUser = deleteUser(user);
        return UserConvertor.userToUserDto(deletedUser);
    }

    public User deleteUser(User user) {
        return userRepository.deleteById2(user);
    }

    @Override
    public List<User> getAll(Pageable pageable) {
        return userRepository.findAllUndeleted(pageable);
    }

    @Override
    public List<UserDto> convertToDtos(List<User> entities) {
        return UserConvertor.usersToUserDtos(entities);
    }

    @Override
    public UserDto getById(long id) {
        User user = getUserById(id);
        return UserConvertor.userToUserDto(user);
    }

    public User getUserById(long id) {
        return userRepository.getById(id);
    }

    public List<User> getOwnersPlace(Place place) {
        return userRepository.getOwnersPlace(place);
    }

    public User findUserByPhoneNumber(String phoneNumber) {
        return userRepository.findByPhoneNumber(phoneNumber);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public UserDto suspendUser(UserParam userParam) {
        User user = getUserById(userParam.getId());
        User suspendUser = suspendUser(user);
        return UserConvertor.userToUserDto(suspendUser);
    }

    public User suspendUser(User user) {
        User initUser = getUserById(user.getId());
        initUser.setUserStatus(UserStatus.SUSPENDED);
        return updateUser(initUser);
    }
}
