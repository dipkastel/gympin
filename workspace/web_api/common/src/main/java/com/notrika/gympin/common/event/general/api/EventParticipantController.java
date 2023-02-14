package com.notrika.gympin.common.event.general.api;

import com.notrika.gympin.common._base.base.BaseController;
import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.event.general.dto.EventParticipantDto;
import com.notrika.gympin.common.event.general.param.EventParticipantParam;
import com.notrika.gympin.common.user.dto.UserDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface EventParticipantController extends BaseController<EventParticipantParam, EventParticipantDto, BaseQuery<?>> {

    ResponseEntity<List<UserDto>> getEventParticipant(Long id);

}
