package com.notrika.gympin.common.event.general.service;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.BaseService;
import com.notrika.gympin.common.event.general.dto.EventParticipantDto;
import com.notrika.gympin.common.event.general.param.EventParticipantParam;
import com.notrika.gympin.common.user.dto.UserDto;

import java.util.List;

public interface EventParticipantService extends BaseService<EventParticipantParam, EventParticipantDto, BaseFilter<?>> {

    List<UserDto> getEventParticipant(Long id);

}
