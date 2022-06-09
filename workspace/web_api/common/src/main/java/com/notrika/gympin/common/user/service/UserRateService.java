package com.notrika.gympin.common.user.service;

import com.notrika.gympin.common.BaseService;
import com.notrika.gympin.common.user.dto.RateableUsersDto;
import com.notrika.gympin.common.user.dto.UserRateDto;
import com.notrika.gympin.common.user.param.UserParam;
import com.notrika.gympin.common.user.param.UserRateParam;

import java.util.List;

public interface UserRateService extends BaseService<UserRateParam, UserRateDto> {

    float calculateUserRate(UserParam userParam);

    List<RateableUsersDto> getRateableUsers();

}
