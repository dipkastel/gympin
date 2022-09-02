package com.notrika.gympin.common.user.api;

import com.notrika.gympin.common.BaseController;
import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.param.UserParam;
import org.springframework.http.ResponseEntity;

public interface UserController extends BaseController<UserParam, UserDto, BaseFilter<?>> {

    ResponseEntity<UserDto> suspendUser(UserParam userParam);

    ResponseEntity<UserDto> getUserByUsername(UserParam userParam);

}
