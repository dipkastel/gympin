package com.notrika.gympin.controller.impl.location;

import com.notrika.gympin.common.BasePagedParam;
import com.notrika.gympin.common.location.api.CityController;
import com.notrika.gympin.common.location.dto.CityDto;
import com.notrika.gympin.common.location.param.CityParam;
import com.notrika.gympin.common.location.param.StateParam;
import com.notrika.gympin.common.location.service.CityService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/city")
public class CityControllerImpl implements CityController {

    private final CityService cityService;

    public CityControllerImpl(CityService cityService) {
        this.cityService = cityService;
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public ResponseEntity<CityDto> add(@RequestBody CityParam cityParam) {
        return new ResponseEntity<CityDto>(cityService.add(cityParam), HttpStatus.OK);
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public ResponseEntity<CityDto> update(@RequestBody CityParam cityParam) {
        return new ResponseEntity<CityDto>(cityService.update(cityParam),HttpStatus.OK);
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public ResponseEntity<CityDto> delete(@RequestBody CityParam cityParam) {
        return new ResponseEntity<CityDto>(cityService.delete(cityParam),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<CityDto>> getAll(BasePagedParam pagingParam) {
        return new ResponseEntity<List<CityDto>>(cityService.getAll(pagingParam),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<CityDto> getById(long id) {
        return new ResponseEntity<CityDto>(cityService.getById(id),HttpStatus.OK);
    }

    @Override
    @GetMapping("/getCitiesByState")
    public ResponseEntity<List<CityDto>> getCitiesByState(StateParam stateParam) {
        return new ResponseEntity<List<CityDto>>(cityService.getCitiesByState(stateParam), HttpStatus.OK);
    }
}
