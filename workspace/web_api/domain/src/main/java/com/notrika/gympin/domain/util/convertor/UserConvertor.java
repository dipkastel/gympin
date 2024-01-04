package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.finance.transaction.dto.FinanceUserDto;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.user.user.dto.UserRegisterDto;
import com.notrika.gympin.common.user.user.enums.UserRole;
import com.notrika.gympin.persistence.entity.finance.user.FinanceUserEntity;
import com.notrika.gympin.persistence.entity.multimedia.MultimediaEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

public final class UserConvertor {

    public static UserDto toDtoComplete(UserEntity user) {
        if (user == null) return null;
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setFullName(user.getFullName());
        dto.setUsername(user.getUsername());
        dto.setPhoneNumber(user.getPhoneNumber());
        dto.setGender(user.getGender());
        dto.setBirthday(user.getBirthday());
        dto.setNationalCode(user.getNationalCode());
        dto.setEmail(user.getEmail());
        dto.setUserGroup(user.getUserGroup());
        dto.setFinanceUser(toFinanceDto(user.getFinanceUser()));
        if (user.getUserRole() == null) {
            dto.setUserRole(UserRoleConvertor.ToUserRoleDto(UserRole.USER));
        } else {
            dto.setUserRole(UserRoleConvertor.ToUserRoleDto(user.getUserRole()));
        }
        dto.setUserStatus(user.getUserStatus());
        dto.setBio(user.getBio());
        MultimediaEntity userMultimedias = user.getUserAvatar();
        dto.setAvatar(MultimediaConvertor.toDto(userMultimedias));
        return dto;
    }

    public static UserDto toDtoBrief(UserEntity user) {
        if (user == null) return null;
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setFullName(user.getFullName());
        dto.setUsername(user.getUsername());
        dto.setBirthday(user.getBirthday());
        dto.setBio(user.getBio());
        return dto;
    }

    public static UserDto toDtoSimple(UserEntity user) {
        if (user == null) return null;
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setFullName(user.getFullName());
        dto.setUsername(user.getUsername());
        dto.setAvatar(MultimediaConvertor.toDto(user.getUserAvatar()));
        dto.setFinanceUser(toFinanceDto(user.getFinanceUser()));
        return dto;
    }

    public static UserDto toDto(UserEntity user) {
        if (user == null) return null;
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setFullName(user.getFullName());
        dto.setUsername(user.getUsername());
        dto.setAvatar(MultimediaConvertor.toDto(user.getUserAvatar()));
        dto.setFinanceUser(toFinanceDto(user.getFinanceUser()));
        return dto;
    }

    @Deprecated(forRemoval = true, since = "Use userToUserDtoBrief")
    public static UserDto toDtoLessDetails(UserEntity user) {
        if (user == null) return null;
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setUserStatus(user.getUserStatus());
        dto.setUsername(user.getUsername());
        dto.setPhoneNumber(user.getPhoneNumber());
        dto.setGender(user.getGender());
        dto.setFullName(user.getFullName());
        dto.setAvatar(MultimediaConvertor.toDto(user.getUserAvatar()));
        dto.setBio(user.getBio());
        return dto;
    }

    public static List<UserDto> toDto(List<UserEntity> users) {
        return users.stream().map(UserConvertor::toDtoComplete).collect(Collectors.toList());
    }
    public static List<FinanceUserDto> toFinanceDto(List<FinanceUserEntity> finance) {
        return finance.stream().map(UserConvertor::toFinanceDto).collect(Collectors.toList());
    }

    public static FinanceUserDto toFinanceDto(FinanceUserEntity finance) {
        if (finance == null) return null;
        FinanceUserDto dto = new FinanceUserDto();
        dto.setId(finance.getId());
        dto.setTotalDeposit(finance.getTotalDeposit());
        return dto;
    }

    public static Page<UserDto> toDto(Page<UserEntity> users) {
        return users.map(UserConvertor::toDtoComplete);
    }


    public static UserRegisterDto toRegisterDto(UserEntity user) {
        if (user == null) return null;
        UserRegisterDto dto = new UserRegisterDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setPhoneNumber(user.getPhoneNumber());
        return dto;
    }

}
