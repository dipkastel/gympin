package com.notrika.gympin.common.user.service;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.BasePagedParam;
import com.notrika.gympin.common.BaseService;
import com.notrika.gympin.common.user.dto.RateableUsersDto;
import com.notrika.gympin.common.user.dto.UserRateDto;
import com.notrika.gympin.common.user.param.UserParam;
import com.notrika.gympin.common.user.param.UserRateParam;

import java.util.List;

public interface UserRateService extends BaseService<UserRateParam, UserRateDto, BaseFilter<?>> {

    float calculateUserRate(UserParam userParam);

    List<RateableUsersDto> getRateableUsers(BasePagedParam<?> pagedParam);

}
