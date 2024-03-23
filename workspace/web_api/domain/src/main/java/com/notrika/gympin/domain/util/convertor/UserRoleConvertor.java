package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.user.user.dto.UserRoleDto;
import com.notrika.gympin.common.user.user.dto.UserRoleInfoDto;
import com.notrika.gympin.common.user.user.enums.RoleEnum;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import com.notrika.gympin.persistence.entity.user.UserRolesEntity;

import java.util.Set;
import java.util.stream.Collectors;

public final class UserRoleConvertor {


    public static UserRoleDto ToUserRoleDto(UserEntity entity) {
        if (entity == null) return null;
        UserRoleDto dto = new UserRoleDto();
        dto.setRole(entity.getUserRoles().stream().map(UserRolesEntity::getRole).collect(Collectors.toSet()));
        dto.setUser(UserConvertor.toDtoSimple(entity));
        return dto;
    }


    public static UserRoleInfoDto ToUserRoleInfoDto(RoleEnum userRole) {
        if (userRole == null) return null;
        UserRoleInfoDto dto = new UserRoleInfoDto();
        dto.setLevel(userRole.getLevel());
        dto.setName(userRole.getName());
        dto.setValue(userRole.toString());
        return dto;
    }

}
