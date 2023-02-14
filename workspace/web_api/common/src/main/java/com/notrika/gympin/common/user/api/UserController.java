package com.notrika.gympin.common.user.api;

import com.notrika.gympin.common._base.base.BaseController;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.dto.UserRoleInfoDto;
import com.notrika.gympin.common.user.param.UserAvatarParam;
import com.notrika.gympin.common.user.param.UserParam;
import com.notrika.gympin.common.user.param.UserRoleUpdateParam;
import com.notrika.gympin.common.user.param.UserStatusParam;
import com.notrika.gympin.common.user.query.UserQuery;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface UserController extends BaseController<UserParam, UserDto, UserQuery> {

    //stattus
    ResponseEntity<List<String>> getUserStatuses();

    ResponseEntity<UserDto> updateUserStatus(@RequestBody UserStatusParam userParam);

    //avatar
    ResponseEntity<UserDto> updateUserAvatar(@RequestBody UserAvatarParam userParam);

    //roles
    ResponseEntity<List<UserRoleInfoDto>> getUserRoles();

    ResponseEntity<UserDto> updateUserRole(UserRoleUpdateParam userParam);

    ResponseEntity<UserDto> getUserByUsername(UserParam userParam);


}
