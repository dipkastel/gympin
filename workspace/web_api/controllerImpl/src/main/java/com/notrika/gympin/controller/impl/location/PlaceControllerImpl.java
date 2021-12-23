package com.notrika.gympin.controller.impl.location;

import com.notrika.gympin.common.BasePagedParam;
import com.notrika.gympin.common.location.api.PlaceController;
import com.notrika.gympin.common.location.dto.PlaceDto;
import com.notrika.gympin.common.location.param.PlaceParam;
import com.notrika.gympin.common.location.service.PlaceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/place")
public class PlaceControllerImpl implements PlaceController {

    private final PlaceService placeService;

    public PlaceControllerImpl(PlaceService placeService) {
        this.placeService = placeService;
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN','MANAGER')")
    public ResponseEntity<PlaceDto> add(PlaceParam placeParam) {
        return new ResponseEntity<PlaceDto>(placeService.add(placeParam), HttpStatus.OK);
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN','MANAGER')")
    public ResponseEntity<PlaceDto> update(PlaceParam placeParam) {
        return new ResponseEntity<PlaceDto>(placeService.update(placeParam), HttpStatus.OK);
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN','MANAGER')")
    public ResponseEntity<PlaceDto> delete(PlaceParam placeParam) {
        return new ResponseEntity<PlaceDto>(placeService.delete(placeParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<PlaceDto>> getAll(BasePagedParam pagingParam) {
        return new ResponseEntity<List<PlaceDto>>(placeService.getAll(pagingParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<PlaceDto> getById(long id) {
        return new ResponseEntity<PlaceDto>(placeService.getById(id), HttpStatus.OK);
    }
}
