package com.notrika.gympin.common.event.walking.api;

import com.notrika.gympin.common.BaseController;
import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.event.walking.dto.UserWalkingEventDto;
import com.notrika.gympin.common.event.walking.dto.WalkingEventDto;
import com.notrika.gympin.common.event.walking.param.WalkingEventParam;
import com.notrika.gympin.common.user.param.UserParam;
import org.springframework.http.ResponseEntity;

public interface WalkingEventController extends BaseController<WalkingEventParam, WalkingEventDto, BaseFilter<?>> {

    ResponseEntity<UserWalkingEventDto> getAllEventOfUser(UserParam user);

}
