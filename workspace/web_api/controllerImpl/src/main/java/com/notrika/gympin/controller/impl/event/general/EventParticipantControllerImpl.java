package com.notrika.gympin.controller.impl.event.general;

import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common._base.param.BasePagedParam;
import com.notrika.gympin.common.event.general.api.EventParticipantController;
import com.notrika.gympin.common.event.general.dto.EventParticipantDto;
import com.notrika.gympin.common.event.general.param.EventParticipantParam;
import com.notrika.gympin.common.event.general.service.EventParticipantService;
import com.notrika.gympin.common.user.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/EventParticipant")
public class EventParticipantControllerImpl implements EventParticipantController {

    @Autowired
    private EventParticipantService eventParticipantService;

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN','MARKET','CONTENT','MANAGER','COACH','ATHLETE','USER')")
    public ResponseEntity<EventParticipantDto> add(EventParticipantParam param) {
        return ResponseEntity.ok(eventParticipantService.add(param));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public ResponseEntity<EventParticipantDto> update(EventParticipantParam param) {
        return ResponseEntity.ok(eventParticipantService.update(param));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN','MARKET','CONTENT','MANAGER','COACH','ATHLETE','USER')")
    public ResponseEntity<EventParticipantDto> delete(EventParticipantParam param) {
        return ResponseEntity.ok(eventParticipantService.delete(param));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public ResponseEntity<List<EventParticipantDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(eventParticipantService.getAll(pagingParam));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public ResponseEntity<EventParticipantDto> getById(Long id) {
        return ResponseEntity.ok(eventParticipantService.getById(id));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN','MARKET','CONTENT','MANAGER','COACH','ATHLETE','USER')")
    @GetMapping("/getEventParticipant")
    public ResponseEntity<List<UserDto>> getEventParticipant(@RequestParam(name = "event-id") Long id) {
        return ResponseEntity.ok(eventParticipantService.getEventParticipant(id));
    }


    @Override
    public ResponseEntity<Page<EventParticipantDto>> query(BaseQuery<?> filter) {
        return null;
    }

}
