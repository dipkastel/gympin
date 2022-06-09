package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.dto.UserRegisterDto;
import com.notrika.gympin.common.user.dto.UserRoleDto;
import com.notrika.gympin.persistence.entity.multimedia.UserMultimediaEntity;
import com.notrika.gympin.persistence.entity.user.User;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

//@Component
public final class UserConvertor {

    public static UserDto userToUserDtoComplete(User user) {
        if (user == null) return null;
        UserDto dto = new UserDto();
        dto.setId(user.getId());
//        dto.setDeleted(user.isDeleted());
//        dto.setCreatedDate(user.getCreatedDate());
        //        dto.setCreatorUser(user.getCreatorUser()); //Loop Error
        dto.setName(user.getName());
        dto.setLastName(user.getLastname());
        dto.setUsername(user.getUsername());
        dto.setPhoneNumber(user.getPhoneNumber());
        dto.setBirthday(user.getBirthday());
        dto.setNationalCode(user.getNationalCode());
        dto.setEmail(user.getEmail());
        dto.setUserGroup(user.getUserGroup());
        List<UserRoleDto> userRoleDtos = new ArrayList<>();
        user.getUserRole().forEach(c -> userRoleDtos.add(UserRoleDto.builder().id(c.getId()).role(c.getRole()).build()));
        dto.setUserRole(userRoleDtos);
        dto.setUserStatus(user.getUserStatus());
        dto.setBio(user.getBio());
        List<UserMultimediaEntity> userMultimedias = user.getUserMultimedias();
        if (userMultimedias != null && userMultimedias.size()>0 ) {
            UserMultimediaEntity userMultimediaEntity = userMultimedias.get(0);
            if(userMultimediaEntity!=null) {
                dto.setAvatarId(userMultimediaEntity.getMultimedia().getId());
            }
        }
        return dto;
    }

    public static UserDto userToUserDtoBrief(User user) {
        if (user == null) return null;
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setLastName(user.getLastname());
        dto.setUsername(user.getUsername());
        dto.setBirthday(user.getBirthday());
        dto.setBio(user.getBio());
        return dto;
    }

    @Deprecated(forRemoval = true, since = "Use userToUserDtoBrief")
    public static UserDto userToUserDtoLessDetails(User user) {
        if (user == null) return null;
        UserDto dto = new UserDto();
//        dto.setId(user.getId());
//        dto.setDeleted(user.isDeleted());
        dto.setUserStatus(user.getUserStatus());
        dto.setUsername(user.getUsername());
        dto.setPhoneNumber(user.getPhoneNumber());
        dto.setName(user.getName());
        dto.setBio(user.getBio());
        return dto;
    }

    public static List<UserDto> usersToUserDtos(List<User> users) {
        return users.stream().map(UserConvertor::userToUserDtoComplete).collect(Collectors.toList());
    }

    public static UserRegisterDto userToRegisterDto(User user) {
        if (user == null) return null;
        UserRegisterDto dto = new UserRegisterDto();
        dto.setUsername(user.getUsername());
        dto.setPhoneNumber(user.getPhoneNumber());
        return dto;
    }

    public static UserDto administratorToAdministratorDto(User administrator) {
        return userToUserDtoLessDetails(administrator);
    }

    public static List<UserDto> administratorsToAdministratorDtos(List<User> administratorList) {
        return administratorList.stream().map(UserConvertor::administratorToAdministratorDto).collect(Collectors.toList());
    }

}
