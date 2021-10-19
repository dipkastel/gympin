package com.notrika.gympin.domain.user;

import com.notrika.gympin.common.context.GympinContext;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.enums.UserGroup;
import com.notrika.gympin.common.user.enums.UserStatus;
import com.notrika.gympin.common.user.param.UserParam;
import com.notrika.gympin.common.user.service.UserService;
import com.notrika.gympin.dao.location.Place;
import com.notrika.gympin.dao.user.User;
import com.notrika.gympin.domain.location.LocationServiceImpl;
import com.notrika.gympin.domain.util.convertor.UserConvertor;
import com.notrika.gympin.persistence.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LocationServiceImpl service;

    @Override
    public UserDto add(UserParam userParam) {
        User initUser =
                User.builder().userGroup(UserGroup.CLIENT).userRole(userParam.getRole()).username(userParam.getUsername()).phoneNumber(userParam.getPhoneNumber()).userStatus(UserStatus.ENABLED).build();
        User user = userRepository.add(initUser);
        return UserConvertor.userToUserDto(user);
    }

    public User addUser(User user) {
        return userRepository.add(user);
    }

    @Override
    public UserDto update(UserParam userParam) {
        User initUser = getUserById(userParam.getId());
        initUser.setUserRole(userParam.getRole());
        initUser.setUsername(userParam.getUsername());
        initUser.setPhoneNumber(userParam.getPhoneNumber());
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
        User deletedUser = userRepository.deleteById2(user);
        return deletedUser;
    }

    @Override
    public List<UserDto> getAll() {
        List<User> userList = userRepository.findAllUndeleted();
        return UserConvertor.usersToUserDtos(userList);
    }

    public List<User> getAllUser() {
        return userRepository.findAllUndeleted();
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

    @Override
    public UserDto suspendUser(UserParam userParam) {
        User user = getUserById(userParam.getId());
        User suspendUser = suspendUser(user);
        return UserConvertor.userToUserDto(suspendUser);
    }

    public User suspendUser(User user) {
        User initUser = getUserById(user.getId());
        initUser.setUserStatus(UserStatus.SUSPENDED);
        User suspendedUser = updateUser(initUser);
        return suspendedUser;
    }

    @Override
    public GympinContext createUserContext(String phoneNumber) {
        User user = findUserByPhoneNumber(phoneNumber);
        GympinContext userContext=new GympinContext();
        userContext.getEntry().put(GympinContext.USER_KEY,user);
        return userContext;
    }

    public void activationCodeExpiration(Long userId){
        activationCodeExpiration(userId);
    }
}
