package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.user.user.dto.UserRoleDto;
import com.notrika.gympin.common.user.user.dto.UserRoleInfoDto;
import com.notrika.gympin.common.user.user.enums.UserRole;
import com.notrika.gympin.persistence.entity.user.UserRoleEntity;

public final class UserRoleConvertor {

    public static UserRoleDto ToUserRoleDto(UserRole userRole) {
        if (userRole == null) return null;
        UserRoleDto dto = new UserRoleDto();
        dto.setRole(userRole);
        return dto;
    }

    public static UserRoleDto ToUserRoleDto(UserRoleEntity userRole) {
        if (userRole == null) return null;
        UserRoleDto dto = new UserRoleDto();
        dto.setRole(userRole.getRole());
        return dto;
    }

    public static UserRoleInfoDto ToUserRoleInfoDto(UserRole userRole) {
        if (userRole == null) return null;
        UserRoleInfoDto dto = new UserRoleInfoDto();
        dto.setLevel(userRole.getLevel());
        dto.setName(userRole.getName());
        dto.setValue(userRole.toString());
        return dto;
    }

}
