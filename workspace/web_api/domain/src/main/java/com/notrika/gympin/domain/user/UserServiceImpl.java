package com.notrika.gympin.domain.user;

import com.notrika.gympin.common.primitive.param.LongParam;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.param.UserParam;
import com.notrika.gympin.common.user.service.UserService;
import com.notrika.gympin.dao.user.User;
import com.notrika.gympin.domain.util.convertor.UserConvertor;
import com.notrika.gympin.persistence.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDto add(UserParam userParam) {
        User initUser=User.builder().userRole(userParam.getRole()).username(userParam.getUsername()).phoneNumber(userParam.getPhoneNumber()).build();
        User user = userRepository.add(initUser);
        return UserConvertor.userToUserDto(user);
    }

    @Override
    public UserDto update(UserParam userParam) {
        User initUser=userRepository.getById(userParam.getId());
        initUser.setUserRole(userParam.getRole());
        initUser.setUsername(userParam.getUsername());
        initUser.setPhoneNumber(userParam.getPhoneNumber());
        User user = userRepository.update(initUser);
        return UserConvertor.userToUserDto(user);
    }

    @Override
    public void delete(UserParam userParam) {
        User user = userRepository.getById(userParam.getId());
        userRepository.deleteById2(user);
    }

    @Override
    public List<UserDto> getAll() {
        List<User> userList = userRepository.findAll();
       return UserConvertor.usersToUserDtos(userList);
    }

    @Override
    public UserDto getById(LongParam longParam) {
        User user = userRepository.getById(longParam.getValue());
        return UserConvertor.userToUserDto(user);
    }
}
