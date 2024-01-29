package com.notrika.gympin.common.user.user.service;

import com.notrika.gympin.common.user.user.dto.RoleEnumDto;
import com.notrika.gympin.common.user.user.enums.RoleEnum;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.util._base.base.BaseService;
import com.notrika.gympin.common.user.user.dto.UserRoleDto;
import com.notrika.gympin.common.user.user.param.UserRoleParam;

import java.util.List;

public interface UserRoleService extends BaseService<UserRoleParam, UserRoleDto, BaseQuery<?>> {

    List<RoleEnumDto> getAllRoles();
}
