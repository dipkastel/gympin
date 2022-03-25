package com.notrika.gympin.controller.impl.location;

import com.notrika.gympin.common.BasePagedParam;
import com.notrika.gympin.common.location.api.RegionController;
import com.notrika.gympin.common.location.dto.RegionDto;
import com.notrika.gympin.common.location.param.CityParam;
import com.notrika.gympin.common.location.param.RegionParam;
import com.notrika.gympin.common.location.service.RegionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/region")
public class RegionControllerImpl implements RegionController {

    private final RegionService regionService;

    public RegionControllerImpl(RegionService regionService) {
        this.regionService = regionService;
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public ResponseEntity<RegionDto> add(@RequestBody RegionParam regionParam) {
        return new ResponseEntity<RegionDto>(regionService.add(regionParam), HttpStatus.OK);
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public ResponseEntity<RegionDto> update(@RequestBody RegionParam regionParam) {
        return new ResponseEntity<RegionDto>(regionService.update(regionParam), HttpStatus.OK);
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public ResponseEntity<RegionDto> delete(RegionParam regionParam) {
        return new ResponseEntity<RegionDto>(regionService.delete(regionParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<RegionDto>> getAll(BasePagedParam pagingParam) {
        return new ResponseEntity<List<RegionDto>>(regionService.getAll(pagingParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<RegionDto> getById(long id) {
        return new ResponseEntity<RegionDto>(regionService.getById(id), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getregionsbycity")
    public ResponseEntity<List<RegionDto>> getRegionsByCity(CityParam cityParam) {
        return new ResponseEntity<List<RegionDto>>(regionService.getRegionsByCity(cityParam), HttpStatus.OK);
    }

}
