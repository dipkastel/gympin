package com.notrika.gympin.common.event.general.service;

import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common._base.base.BaseService;
import com.notrika.gympin.common.event.general.dto.EventParticipantDto;
import com.notrika.gympin.common.event.general.param.EventParticipantParam;
import com.notrika.gympin.common.user.dto.UserDto;

import java.util.List;

public interface EventParticipantService extends BaseService<EventParticipantParam, EventParticipantDto, BaseQuery<?>> {

    List<UserDto> getEventParticipant(Long id);

}
