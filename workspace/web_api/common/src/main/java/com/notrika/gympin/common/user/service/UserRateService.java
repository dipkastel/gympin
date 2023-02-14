package com.notrika.gympin.common.user.service;

import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common._base.param.BasePagedParam;
import com.notrika.gympin.common._base.base.BaseService;
import com.notrika.gympin.common.user.dto.RateableUsersDto;
import com.notrika.gympin.common.user.dto.UserRateDto;
import com.notrika.gympin.common.user.param.UserParam;
import com.notrika.gympin.common.user.param.UserRateParam;

import java.util.List;

public interface UserRateService extends BaseService<UserRateParam, UserRateDto, BaseQuery<?>> {

    float calculateUserRate(UserParam userParam);

    List<RateableUsersDto> getRateableUsers(BasePagedParam pagedParam);

}
