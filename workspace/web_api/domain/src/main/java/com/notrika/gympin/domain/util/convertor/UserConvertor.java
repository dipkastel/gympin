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
        if (user == null) return null;
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setUserRole(user.getUserRole());
        dto.setUserStatus(user.getUserStatus());
        dto.setUsername(user.getUsername());
        dto.setPhoneNumber(user.getPhoneNumber());
        dto.setToken(user.getUserTokens().toString());
        dto.setName(user.getName());
        return dto;
    }

    public static List<UserDto> usersToUserDtos(List<User> users) {
        return users.stream().map(UserConvertor::userToUserDto).collect(Collectors.toList());
    }

    public static User userDtoToUser(UserDto userDto) {
        if (userDto == null) return null;
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
        if (user == null) return null;
        UserRegisterDto dto = new UserRegisterDto();
        dto.setUsername(user.getUsername());
        dto.setPhoneNumber(user.getPhoneNumber());
        return dto;
    }

    public static List<UserRegisterDto> usersToUserRegisterDtos(List<User> users) {
        return users.stream().map(UserConvertor::userToRegisterDto).collect(Collectors.toList());
    }

    public static User userRegisterDtoToUser(UserRegisterDto userDto) {
        if (userDto == null) return null;

        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setPhoneNumber(userDto.getPhoneNumber());
        return user;
    }

    public static List<User> userRegisterDtosToUsers(List<UserRegisterDto> userRegisterDtos) {
        return userRegisterDtos.stream().map(UserConvertor::userRegisterDtoToUser).collect(Collectors.toList());
    }

    public static AdministratorDto administratorToAdministratorDto(Administrator administrator) {
        AdministratorDto admin = new AdministratorDto();
        admin.setId(administrator.getBaseUser().getId());
        admin.setName(administrator.getBaseUser().getName());
        admin.setUserGroup(administrator.getBaseUser().getUserGroup());
        admin.setUserRole(administrator.getBaseUser().getUserRole());
        admin.setUsername(administrator.getBaseUser().getUsername());
        admin.setPhoneNumber(administrator.getBaseUser().getPhoneNumber());
        admin.setUserStatus(administrator.getBaseUser().getUserStatus());
        if (administrator.getBaseUser().getUserTokens()!=null && administrator.getBaseUser().getUserTokens().stream().findFirst().orElse(null) != null)
            admin.setToken(administrator.getBaseUser().getUserTokens().stream().findFirst().get().getToken());
        admin.setAdministratorName(administrator.getAdministratorName());
        admin.setPassword(administrator.getPassword());
        admin.setEmail(administrator.getEmail());
        return admin;
    }

    public static List<AdministratorDto> administratorsToAdministratorDtos(List<Administrator> administratorList) {
        return administratorList.stream().map(UserConvertor::administratorToAdministratorDto).collect(Collectors.toList());
    }

}
