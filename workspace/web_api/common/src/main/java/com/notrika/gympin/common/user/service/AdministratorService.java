package com.notrika.gympin.common.user.service;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.BaseService;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.param.UserParam;

public interface AdministratorService extends BaseService<UserParam, UserDto, BaseFilter<?>> {

    //todo change password

    //todo add avatar

}
