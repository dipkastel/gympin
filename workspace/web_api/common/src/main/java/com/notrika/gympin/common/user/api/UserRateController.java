package com.notrika.gympin.common.user.api;

import com.notrika.gympin.common.BaseController;
import com.notrika.gympin.common.BasePagedParam;
import com.notrika.gympin.common.user.dto.RateableUsersDto;
import com.notrika.gympin.common.user.dto.UserRateDto;
import com.notrika.gympin.common.user.param.UserRateParam;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserRateController  extends BaseController<UserRateParam, UserRateDto> {

    ResponseEntity<List<RateableUsersDto>> getRateableUsers(BasePagedParam<?> pagedParam);

}
