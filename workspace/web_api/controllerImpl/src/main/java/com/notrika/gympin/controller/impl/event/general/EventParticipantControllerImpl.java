package com.notrika.gympin.controller.impl.event.general;

import com.notrika.gympin.common.BasePagedParam;
import com.notrika.gympin.common.event.general.api.EventParticipantController;
import com.notrika.gympin.common.event.general.dto.EventParticipantDto;
import com.notrika.gympin.common.event.general.param.EventParticipantParam;
import com.notrika.gympin.common.event.general.service.EventParticipantService;
import com.notrika.gympin.common.user.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/EventParticipant")
public class EventParticipantControllerImpl implements EventParticipantController {

    @Autowired
    private EventParticipantService eventParticipantService;

    @Override
    public ResponseEntity<EventParticipantDto> add(@RequestBody EventParticipantParam param) {
        return new ResponseEntity<>(eventParticipantService.add(param), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<EventParticipantDto> update(@RequestBody EventParticipantParam param) {
        return new ResponseEntity<>(eventParticipantService.update(param), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<EventParticipantDto> delete(@RequestBody EventParticipantParam param) {
        return new ResponseEntity<>(eventParticipantService.delete(param), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<EventParticipantDto>> getAll(BasePagedParam pagingParam) {
        return new ResponseEntity<>(eventParticipantService.getAll(pagingParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<EventParticipantDto> getById(Long id) {
        return new ResponseEntity<>(eventParticipantService.getById(id), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<UserDto>> getEventParticipant(Long id) {
        return new ResponseEntity<>(eventParticipantService.getEventParticipant(id), HttpStatus.OK);
    }
}
