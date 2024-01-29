package com.notrika.gympin.common.user.user.service;

import com.notrika.gympin.common.user.user.dto.UserCreditDto;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.user.user.dto.UserRoleInfoDto;
import com.notrika.gympin.common.user.user.param.UserAvatarParam;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.user.user.param.UserStatusParam;
import com.notrika.gympin.common.user.user.query.UserQuery;
import com.notrika.gympin.common.util._base.base.BaseService;

import java.util.List;

public interface UserService extends BaseService<UserParam, UserDto, UserQuery> {

    UserDto updateUserStatus(UserStatusParam param);

    UserDto getUserByUsername(UserParam userParam);

    List<UserRoleInfoDto> getAllRoles();

    UserDto updateUserAvatar(UserAvatarParam userParam);

    Boolean checkUsernameAvailable(String userParam);

    UserDto getMyInfo();

    UserCreditDto getCreditsByUser(UserParam userParam);

    UserCreditDto getMyCredits();

}
