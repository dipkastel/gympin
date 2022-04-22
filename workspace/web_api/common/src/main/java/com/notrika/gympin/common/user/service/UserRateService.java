package com.notrika.gympin.common.user.service;

import com.notrika.gympin.common.BaseService;
import com.notrika.gympin.common.user.dto.UserRateDto;
import com.notrika.gympin.common.user.param.UserParam;
import com.notrika.gympin.common.user.param.UserRateParam;

public interface UserRateService extends BaseService<UserRateParam, UserRateDto> {

    float calculateUserRate(UserParam userParam);

}
