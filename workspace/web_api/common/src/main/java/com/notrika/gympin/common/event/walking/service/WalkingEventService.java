package com.notrika.gympin.common.event.walking.service;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.BaseService;
import com.notrika.gympin.common.event.BaseEventFilter;
import com.notrika.gympin.common.event.walking.dto.UserWalkingEventDto;
import com.notrika.gympin.common.event.walking.dto.WalkingEventDto;
import com.notrika.gympin.common.event.walking.param.WalkingEventParam;
import com.notrika.gympin.common.user.param.UserParam;

public interface WalkingEventService extends BaseService<WalkingEventParam, WalkingEventDto, BaseEventFilter> {

    UserWalkingEventDto getAllEventOfUser(UserParam user);

}
