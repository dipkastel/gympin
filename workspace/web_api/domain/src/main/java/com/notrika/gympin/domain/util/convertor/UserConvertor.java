package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.user.dto.AdministratorDto;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.dto.UserRegisterDto;
import com.notrika.gympin.common.user.enums.UserRole;
import com.notrika.gympin.dao.administrator.Administrator;
import com.notrika.gympin.dao.user.User;

import java.util.List;
import java.util.stream.Collectors;

//@Component
public class UserConvertor {

    public static UserDto userToUserDto(User user) {
        if (user == null)
            return null;
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        if (user.getUserRole() != null)
            dto.setUserRole(UserRole.valueOf(user.getUserRole().name()));
        dto.setPhoneNumber(user.getPhoneNumber());
        return dto;
    }

    public static List<UserDto> usersToUserDtos(List<User> users) {
        return users.stream().map(UserConvertor::userToUserDto).collect(Collectors.toList());
    }

    public static User userDtoToUser(UserDto userDto) {
        if (userDto == null)
            return null;
        User user = new User();
        user.setId(userDto.getId());
        user.setUsername(userDto.getUsername());
        user.setPhoneNumber(userDto.getPhoneNumber());
        user.setUserRole(UserRole.valueOf(userDto.getUserRole().name()));
        return user;
    }

    public static List<User> userDtosToUsers(List<UserDto> userDtos) {
        return userDtos.stream().map(UserConvertor::userDtoToUser).collect(Collectors.toList());
    }

    public static UserRegisterDto userToRegisterDto(User user) {
        if (user == null)
            return null;
        UserRegisterDto dto = new UserRegisterDto();
        dto.setUsername(user.getUsername());
        dto.setPhoneNumber(user.getPhoneNumber());
        return dto;
    }

    public static List<UserRegisterDto> usersToUserRegisterDtos(List<User> users) {
        return users.stream().map(UserConvertor::userToRegisterDto).collect(Collectors.toList());
    }

    public static User userRegisterDtoToUser(UserRegisterDto userDto) {
        if (userDto == null)
            return null;

        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setPhoneNumber(userDto.getPhoneNumber());
        return user;
    }

    public static List<User> userRegisterDtosToUsers(List<UserRegisterDto> userRegisterDtos) {
        return userRegisterDtos.stream().map(UserConvertor::userRegisterDtoToUser).collect(Collectors.toList());
    }

    public static AdministratorDto administratorToAdministratorDto(Administrator administrator){
        AdministratorDto administratorDto=AdministratorDto.builder().userRole(administrator.getBaseUser().getUserRole()).username(administrator.getBaseUser().getUsername()).phoneNumber(administrator.getBaseUser().getPhoneNumber()).administratorName(administrator.getAdministratorName()).password(administrator.getPassword()).email(administrator.getEmail()).build();
        return administratorDto;
    }

    public static List<AdministratorDto> administratorsToAdministratorDtos(List<Administrator> administratorList){
        return administratorList.stream().map(UserConvertor::administratorToAdministratorDto).collect(Collectors.toList());
    }


}
