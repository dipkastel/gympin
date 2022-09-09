package com.notrika.gympin.controller.impl.event.walking;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.BasePagedParam;
import com.notrika.gympin.common.event.walking.api.WalkingEventController;
import com.notrika.gympin.common.event.walking.dto.UserWalkingEventDto;
import com.notrika.gympin.common.event.walking.dto.WalkingEventDto;
import com.notrika.gympin.common.event.walking.param.WalkingEventParam;
import com.notrika.gympin.common.event.walking.service.WalkingEventService;
import com.notrika.gympin.common.user.param.UserParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/WalkingEvent")
public class WalkingEventControllerImpl implements WalkingEventController {

    @Autowired
    private WalkingEventService walkingEventService;

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN','MARKET','CONTENT','MANAGER','COACH','ATHLETE','USER')")
    public ResponseEntity<WalkingEventDto> add(WalkingEventParam param) {
        return ResponseEntity.ok(walkingEventService.add(param));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public ResponseEntity<WalkingEventDto> update(WalkingEventParam param) {
        return ResponseEntity.ok(walkingEventService.update(param));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN','MARKET','CONTENT','MANAGER','COACH','ATHLETE','USER')")
    public ResponseEntity<WalkingEventDto> delete(WalkingEventParam param) {
        return ResponseEntity.ok(walkingEventService.delete(param));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN','MARKET','CONTENT','MANAGER','COACH','ATHLETE','USER')")
    public ResponseEntity<List<WalkingEventDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(walkingEventService.getAll(pagingParam));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN','MARKET','CONTENT','MANAGER','COACH','ATHLETE','USER')")
    public ResponseEntity<WalkingEventDto> getById(Long id) {
        return ResponseEntity.ok(walkingEventService.getById(id));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN','MARKET','CONTENT','MANAGER','COACH','ATHLETE','USER')")
    @GetMapping("/getAllEventOfUser")
    public ResponseEntity<UserWalkingEventDto> getAllEventOfUser(UserParam user) {
        return ResponseEntity.ok(walkingEventService.getAllEventOfUser(user));
    }

    @Override
    public ResponseEntity<Long> countSearch(BaseFilter<?> filter) {
        return null;
    }

    @Override
    public ResponseEntity<List<WalkingEventDto>> search(BaseFilter<?> filter) {
        return null;
    }

    @Override
    public ResponseEntity<Long> countFilter(BaseFilter<?> filter) {
        return null;
    }

    @Override
    public ResponseEntity<List<WalkingEventDto>> filter(BaseFilter<?> filter) {
        return null;
    }
}
