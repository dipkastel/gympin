package com.notrika.gympin.controller.impl.event.walking;

import com.notrika.gympin.common.BasePagedParam;
import com.notrika.gympin.common.event.walking.api.WalkingEventController;
import com.notrika.gympin.common.event.walking.dto.WalkingEventDto;
import com.notrika.gympin.common.event.walking.param.WalkingEventParam;
import com.notrika.gympin.common.event.walking.service.WalkingEventService;
import com.notrika.gympin.common.location.dto.CityDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/WalkingEvent")
public class WalkingEventControllerImpl implements WalkingEventController {

    @Autowired
    private WalkingEventService walkingEventService;

    @Override
    public ResponseEntity<WalkingEventDto> add(WalkingEventParam param) {
        return new ResponseEntity<>(walkingEventService.add(param), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<WalkingEventDto> update(WalkingEventParam param) {
        return new ResponseEntity<>(walkingEventService.update(param), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<WalkingEventDto> delete(WalkingEventParam param) {
        return new ResponseEntity<>(walkingEventService.delete(param), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<WalkingEventDto>> getAll(BasePagedParam pagingParam) {
        return new ResponseEntity<>(walkingEventService.getAll(pagingParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<WalkingEventDto> getById(long id) {
        return new ResponseEntity<>(walkingEventService.getById(id), HttpStatus.OK);
    }
}
