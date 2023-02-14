package com.notrika.gympin.common.user.api;

import com.notrika.gympin.common._base.base.BaseController;
import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common._base.param.BasePagedParam;
import com.notrika.gympin.common.user.dto.RateableUsersDto;
import com.notrika.gympin.common.user.dto.UserRateDto;
import com.notrika.gympin.common.user.param.UserRateParam;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserRateController  extends BaseController<UserRateParam, UserRateDto, BaseQuery<?>> {

    ResponseEntity<List<RateableUsersDto>> getRateableUsers(BasePagedParam pagedParam);

}
