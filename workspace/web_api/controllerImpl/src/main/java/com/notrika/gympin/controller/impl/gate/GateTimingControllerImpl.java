package com.notrika.gympin.controller.impl.gate;

import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common._base.param.BasePagedParam;
import com.notrika.gympin.common.gate.api.GateTimingController;
import com.notrika.gympin.common.gate.dto.GateTimingDto;
import com.notrika.gympin.common.gate.param.GateParam;
import com.notrika.gympin.common.gate.param.GateTimingParam;
import com.notrika.gympin.common.gate.service.GateTimingService;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/gateTiming")
public class GateTimingControllerImpl implements GateTimingController {

    @Autowired
    GateTimingService gateTimingService;

    @Override
    public ResponseEntity<GateTimingDto> add(GateTimingParam gateTimingParam) {
        return new ResponseEntity<>(gateTimingService.add(gateTimingParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<GateTimingDto> update(GateTimingParam gateTimingParam) {
        return new ResponseEntity<>(gateTimingService.update(gateTimingParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<GateTimingDto> delete(GateTimingParam gateTimingParam) {
        return new ResponseEntity<>(gateTimingService.delete(gateTimingParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<GateTimingDto>> getAll(BasePagedParam pagingParam) {
        return new ResponseEntity<>(gateTimingService.getAll(pagingParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<GateTimingDto> getById(Long id) {
        return new ResponseEntity<>(gateTimingService.getById(id), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Page<GateTimingDto>> query(BaseQuery<?> filter) {
        return null;
    }


    @Override
    @GetMapping("/getByGate")
    public ResponseEntity<List<GateTimingDto>> getTimingByGate(GateParam gateParam) {
        return new ResponseEntity<>(gateTimingService.getByGateId(gateParam.getId()), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getByPlace")
    public ResponseEntity<List<GateTimingDto>> getTimingByPlace(PlaceParam placeParam) {
        return new ResponseEntity<List<GateTimingDto>>(gateTimingService.getByPlaceId(placeParam.getId()),HttpStatus.OK);
    }

    @Override
    @PostMapping("/addAll")
    public ResponseEntity<List<GateTimingDto>> addAll(@RequestBody List<GateTimingParam> gateTimingParams) {
        return new ResponseEntity<List<GateTimingDto>>(gateTimingService.addAll(gateTimingParams), HttpStatus.OK);
    }
}
