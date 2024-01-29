package com.notrika.gympin.common.user.user.api;

import com.notrika.gympin.common.user.user.dto.RoleEnumDto;
import com.notrika.gympin.common.user.user.dto.UserRoleDto;
import com.notrika.gympin.common.user.user.enums.RoleEnum;
import com.notrika.gympin.common.user.user.param.UserRoleParam;
import com.notrika.gympin.common.user.user.query.UserRoleQuery;
import com.notrika.gympin.common.util._base.base.BaseController;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserRolesController extends BaseController<UserRoleParam, UserRoleDto, UserRoleQuery> {


    ResponseEntity<List<RoleEnumDto>> getAllRoles();


}
