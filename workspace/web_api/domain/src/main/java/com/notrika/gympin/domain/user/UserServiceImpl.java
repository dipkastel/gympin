package com.notrika.gympin.domain.user;

import com.notrika.gympin.common.user.dto.UserDto;
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
        User initUser=User.builder().userRole(userParam.getRole()).username(userParam.getUsername()).phoneNumber(userParam.getPhoneNumber()).build();
        User user = userRepository.add(initUser);
        return UserConvertor.userToUserDto(user);
    }

    public User addUser(User user) {
       return userRepository.add(user);
    }

    @Override
    public UserDto update(UserParam userParam) {
        User initUser=getUserById(userParam.getId());
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
    public void delete(UserParam userParam) {
        User user = getUserById(userParam.getId());
        deleteUser(user);
    }

    public void deleteUser(User user) {
        userRepository.deleteById2(user);
    }

    @Override
    public List<UserDto> getAll() {
        List<User> userList = userRepository.findAll();
       return UserConvertor.usersToUserDtos(userList);
    }

    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    @Override
    public UserDto getById(long id) {
        User user = getUserById(id);
        return UserConvertor.userToUserDto(user);
    }

    public User getUserById(long id) {
        return userRepository.getById(id);
    }

    public List<User> getOwnersPlace(Place place){
        return userRepository.getOwnersPlace(place);
    }

    public User findUserByPhoneNumber(String phoneNumber){
        return userRepository.findByPhoneNumber(phoneNumber);
    }

    public User findByUsername(String username){
        return userRepository.findByUsername(username);
    }
}
