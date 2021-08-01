package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.dto.UserRegisterDto;
import com.notrika.gympin.common.user.enums.UserRoles;
import com.notrika.gympin.dao.user.User;

import java.util.List;
import java.util.stream.Collectors;

//@Component
public class UserConvertor {

    public static UserDto userToUserDto(User user){
        if(user==null)
            return null;
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setRole(UserRoles.valueOf(user.getUserRoles().name()));
        dto.setPhoneNumber(user.getPhoneNumber());
        return dto;
    }

    public static  List<UserDto> usersToUserDtos(List<User> users){
        return users.stream().map(x-> userToUserDto(x)).collect(Collectors.toList());
    }

    public static User userDtoToUser(UserDto userDto){
        if(userDto==null)
            return null;
        User user = new User();
        user.setId(userDto.getId());
        user.setUsername(userDto.getUsername());
        user.setPhoneNumber(userDto.getPhoneNumber());
        user.setUserRoles(UserRoles.valueOf(userDto.getRole().name()));
        return user;
    }

    public static List<User> userDtosToUsers(List<UserDto> userDtos){
        return userDtos.stream().map(x-> userDtoToUser(x)).collect(Collectors.toList());
    }

    public static UserRegisterDto userToRegisterDto(User user){
        if(user==null)
            return null;
        UserRegisterDto dto = new UserRegisterDto();
        dto.setUsername(user.getUsername());
        dto.setPhoneNumber(user.getPhoneNumber());
        return dto;
    }

    public static List<UserRegisterDto> usersToUserRegisterDtos(List<User> users){
        return users.stream().map(x-> userToRegisterDto(x)).collect(Collectors.toList());
    }

    public static User userRegisterDtoToUser(UserRegisterDto userDto){
        if(userDto==null)
            return null;
        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setPhoneNumber(userDto.getPhoneNumber());
        return user;
    }

    public static List<User> userRegisterDtosToUsers(List<UserRegisterDto> userRegisterDtos){

        return userRegisterDtos.stream().map(x-> userRegisterDtoToUser(x)).collect(Collectors.toList());
    }

}
