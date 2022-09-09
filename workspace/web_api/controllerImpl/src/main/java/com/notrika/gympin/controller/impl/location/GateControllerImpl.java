package com.notrika.gympin.controller.impl.location;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.BasePagedParam;
import com.notrika.gympin.common.location.api.GateController;
import com.notrika.gympin.common.location.dto.GateDto;
import com.notrika.gympin.common.location.filter.GateFilter;
import com.notrika.gympin.common.location.param.GateParam;
import com.notrika.gympin.common.location.param.PlaceParam;
import com.notrika.gympin.common.location.service.GateService;
import com.notrika.gympin.common.sport.param.SportParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/gate")
public class GateControllerImpl implements GateController {

    @Autowired
    private GateService gateService;

    @Override
    public ResponseEntity<GateDto> add(GateParam gateParam) {
        return ResponseEntity.ok(gateService.add(gateParam));
    }

    @Override
    public ResponseEntity<GateDto> update(GateParam gateParam) {
        return ResponseEntity.ok(gateService.update(gateParam));
    }

    @Override
    public ResponseEntity<GateDto> delete(GateParam gateParam) {
        return ResponseEntity.ok(gateService.delete(gateParam));
    }

    @Override
    public ResponseEntity<List<GateDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(gateService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<GateDto> getById(Long id) {
        return ResponseEntity.ok(gateService.getById(id));
    }

    @Override
    public ResponseEntity<Long> countSearch() {
        return null;
    }

    @Override
    public ResponseEntity<List<GateDto>> search(GateFilter filter) {
        return ResponseEntity.ok(gateService.search(filter));
    }

    @Override
    public ResponseEntity<Long> countFilter(GateFilter filter) {
        return ResponseEntity.ok(gateService.countSearch(filter));
    }

    @Override
    public ResponseEntity<List<GateDto>> filter(GateFilter filter) {
        return null;
    }

    @Override
    @GetMapping("/get-gates-by-place")
    public ResponseEntity<List<GateDto>> getGatesByPlace(PlaceParam place) {
        return ResponseEntity.ok(gateService.getGatesByPlace(place));
    }

    @Override
    @GetMapping("/get-gates-by-sport")
    public ResponseEntity<List<GateDto>> getGatesBySport(SportParam sport) {
        return ResponseEntity.ok(gateService.getGatesBySport(sport));
    }
}
