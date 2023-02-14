package com.notrika.gympin.controller.impl.gate;

import com.notrika.gympin.common._base.param.BasePagedParam;
import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.gate.api.GateController;
import com.notrika.gympin.common.gate.dto.GateDto;
import com.notrika.gympin.common.gate.filter.GateFilter;
import com.notrika.gympin.common.gate.param.GateParam;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.gate.service.GateService;
import com.notrika.gympin.common.sport.param.SportParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
    public ResponseEntity<Page<GateDto>> query(GateFilter param) {
        return null;
    }

    @Override
    @GetMapping("/getGatesByPlace")
    public ResponseEntity<List<GateDto>> getGatesByPlace(PlaceParam place) {
        return ResponseEntity.ok(gateService.getGatesByPlace(place));
    }

    @Override
    @GetMapping("/getGatesBySport")
    public ResponseEntity<List<GateDto>> getGatesBySport(SportParam sport) {
        return ResponseEntity.ok(gateService.getGatesBySport(sport));
    }
}
