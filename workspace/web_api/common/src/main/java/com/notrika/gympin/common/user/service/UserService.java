package com.notrika.gympin.common.user.service;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.BaseService;
import com.notrika.gympin.common.context.GympinContext;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.param.UserParam;

public interface UserService extends BaseService<UserParam, UserDto, BaseFilter<?>> {

    UserDto suspendUser(UserParam userParam);

    UserDto getUserByUsername(UserParam userParam);

    UserDto getUserDtoByAnyKey(UserParam userParam);

}
