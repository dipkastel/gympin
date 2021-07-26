package com.notrika.web_api.data.converter;

import com.notrika.web_api.data.Dto.User_Dto;
import com.notrika.web_api.data.Dto.User_Register_dto;
import com.notrika.web_api.data.Entity.User;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserConvertor {

    public User_Dto EntityToDto(User user){
        User_Dto dto = new User_Dto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setRole(user.getRole());
        dto.setPhoneNumber(user.getPhoneNumber());
        return dto;
    }
    public User_Register_dto EntityToRegisterDto(User user){
        User_Register_dto dto = new User_Register_dto();
        dto.setUsername(user.getUsername());
        dto.setPhoneNumber(user.getPhoneNumber());
        return dto;
    }
    public User DtoToEntity(User_Dto userDto){
        User user = new User();
        user.setId(userDto.getId());
        user.setUsername(userDto.getUsername());
        user.setPhoneNumber(userDto.getPhoneNumber());
        user.setRole(userDto.getRole());
        return user;
    }
    public User RegisterDtoToEntity(User_Register_dto userDto){
        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setPhoneNumber(userDto.getPhoneNumber());
        return user;
    }


    public List<User_Dto> EntityToDto(List<User> users){
        return users.stream().map(x-> EntityToDto(x)).collect(Collectors.toList());
    }

    public List<User> DtoToEntity(List<User_Dto> userDtos){

        return userDtos.stream().map(x-> DtoToEntity(x)).collect(Collectors.toList());
    }

    public List<User_Register_dto> EntityToRegisterDto(List<User> users){
        return users.stream().map(x-> EntityToRegisterDto(x)).collect(Collectors.toList());
    }

    public List<User> RegisterDtoToEntity(List<User_Register_dto> userRegisterDtos){

        return userRegisterDtos.stream().map(x-> RegisterDtoToEntity(x)).collect(Collectors.toList());
    }
}
