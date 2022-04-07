package com.notrika.gympin.common.event.walking.service;

import com.notrika.gympin.common.BaseService;
import com.notrika.gympin.common.event.walking.dto.UserWalkingEventDto;
import com.notrika.gympin.common.event.walking.dto.WalkingEventDto;
import com.notrika.gympin.common.event.walking.param.WalkingEventParam;
import com.notrika.gympin.common.user.param.UserParam;

public interface WalkingEventService extends BaseService<WalkingEventParam, WalkingEventDto> {

    UserWalkingEventDto getAllEventOfUser(UserParam user);

}
