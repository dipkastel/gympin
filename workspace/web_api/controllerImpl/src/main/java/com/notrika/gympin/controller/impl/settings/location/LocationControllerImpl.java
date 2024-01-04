package com.notrika.gympin.controller.impl.settings.location;

import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.settings.location.api.LocationController;
import com.notrika.gympin.common.settings.location.dto.*;
import com.notrika.gympin.common.settings.location.param.*;
import com.notrika.gympin.common.settings.location.query.LocationQuery;
import com.notrika.gympin.common.settings.location.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/location")
public class LocationControllerImpl implements LocationController {

    @Autowired
    LocationService locationService;

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<LocationDto> add(LocationParam locationParam) {
        return ResponseEntity.ok(locationService.add(locationParam));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<LocationDto> update(LocationParam locationParam) {
        return ResponseEntity.ok(locationService.update(locationParam));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<LocationDto> delete(LocationParam locationParam) {
        return ResponseEntity.ok(locationService.delete(locationParam));
    }

    @Override
    public ResponseEntity<List<LocationDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(locationService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<LocationDto> getById(Long id) {
        return ResponseEntity.ok(locationService.getById(id));
    }

    @Override
    public ResponseEntity<Page<LocationDto>> query(LocationQuery param) {
        return ResponseEntity.ok(locationService.query(param));
    }
}
