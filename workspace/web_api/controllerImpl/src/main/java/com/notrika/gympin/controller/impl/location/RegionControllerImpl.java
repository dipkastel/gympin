package com.notrika.gympin.controller.impl.location;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.BasePagedParam;
import com.notrika.gympin.common.location.api.RegionController;
import com.notrika.gympin.common.location.dto.RegionDto;
import com.notrika.gympin.common.location.param.CityParam;
import com.notrika.gympin.common.location.param.RegionParam;
import com.notrika.gympin.common.location.service.RegionService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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
        return ResponseEntity.ok(regionService.add(regionParam));
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public ResponseEntity<RegionDto> update(@RequestBody RegionParam regionParam) {
        return ResponseEntity.ok(regionService.update(regionParam));
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    @DeleteMapping("/delete")
    public ResponseEntity<RegionDto> delete(@RequestBody RegionParam regionParam) {
        return ResponseEntity.ok(regionService.delete(regionParam));
    }

    @Override
    public ResponseEntity<List<RegionDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(regionService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<RegionDto> getById(Long id) {
        return ResponseEntity.ok(regionService.getById(id));
    }

    @Override
    @GetMapping("/getRegionsByCity")
    public ResponseEntity<List<RegionDto>> getRegionsByCity(CityParam cityParam) {
        return ResponseEntity.ok(regionService.getRegionsByCity(cityParam));
    }

    @Override
    public ResponseEntity<Long> countSearch() {
        return null;
    }

    @Override
    public ResponseEntity<List<RegionDto>> search(BaseFilter<?> filter) {
        return null;
    }

    @Override
    public ResponseEntity<Long> countFilter(BaseFilter<?> filter) {
        return null;
    }

    @Override
    public ResponseEntity<List<RegionDto>> filter(BaseFilter<?> filter) {
        return null;
    }
}
