package com.notrika.gympin.common.user.user.service;

import com.notrika.gympin.common.finance.transaction.dto.FinanceUserDto;
import com.notrika.gympin.common.finance.transaction.param.FinanceUserParam;
import com.notrika.gympin.common.user.user.dto.UserCreditDto;
import com.notrika.gympin.common.user.user.param.*;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.util._base.base.BaseService;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.user.user.dto.UserRoleInfoDto;
import com.notrika.gympin.common.user.user.query.UserQuery;

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

    UserCreditDto getCreditsByUser(UserParam userParam);
    UserCreditDto getMyCredits();

}
