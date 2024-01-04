package com.notrika.gympin.common.user.user.api;

import com.notrika.gympin.common.finance.transaction.dto.FinanceUserDto;
import com.notrika.gympin.common.finance.transaction.param.FinanceUserParam;
import com.notrika.gympin.common.user.user.dto.UserCreditDto;
import com.notrika.gympin.common.user.user.param.*;
import com.notrika.gympin.common.util._base.base.BaseController;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.user.user.dto.UserRoleInfoDto;
import com.notrika.gympin.common.user.user.query.UserQuery;
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

    ResponseEntity<Boolean> checkUsernameAvailable(String username);

    ResponseEntity<UserDto> getMyInfo();

    ResponseEntity<UserCreditDto> getUserCredits(UserParam param);
    ResponseEntity<UserCreditDto> getMyCredits();




}
