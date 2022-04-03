package com.notrika.gympin.common.event.general.api;

import com.notrika.gympin.common.BaseController;
import com.notrika.gympin.common.event.general.dto.EventParticipantDto;
import com.notrika.gympin.common.event.general.param.EventParticipantParam;
import com.notrika.gympin.common.user.dto.UserDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface EventParticipantController extends BaseController<EventParticipantParam, EventParticipantDto> {

    @GetMapping("/getEventParticipant")
    ResponseEntity<List<UserDto>> getEventParticipant(@RequestParam(name = "event-id") Long id);

}
