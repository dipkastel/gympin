package com.notrika.gympin.common.user.service;

import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common._base.base.BaseService;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.dto.UserRoleInfoDto;
import com.notrika.gympin.common.user.query.UserQuery;
import com.notrika.gympin.common.user.param.UserAvatarParam;
import com.notrika.gympin.common.user.param.UserParam;
import com.notrika.gympin.common.user.param.UserRoleUpdateParam;
import com.notrika.gympin.common.user.param.UserStatusParam;

import java.util.List;

public interface UserService extends BaseService<UserParam, UserDto, UserQuery> {

    UserDto updateUserStatus(UserStatusParam param);

    UserDto getUserByUsername(UserParam userParam);

    UserDto getUserDtoByAnyKey(UserParam userParam);

    List<UserRoleInfoDto> getAllRules();

    UserDto UpdateUserRole(UserRoleUpdateParam userParam);

    Long getCount(BaseQuery<?> filter);

    UserDto updateUserAvatar(UserAvatarParam userParam);

    Boolean checkUsernameAvailable(String userParam);

    UserDto getMyInfo();

}
