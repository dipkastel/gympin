package com.notrika.gympin.controller.impl.gate;

import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common._base.param.BasePagedParam;
import com.notrika.gympin.common.gate.api.GateTrafficController;
import com.notrika.gympin.common.gate.dto.GateTrafficDto;
import com.notrika.gympin.common.gate.param.GateParam;
import com.notrika.gympin.common.gate.param.GateTrafficParam;
import com.notrika.gympin.common.gate.service.GateTrafficService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/gateTraffic")
public class GateTrafficControllerImpl implements GateTrafficController {

    @Autowired
    GateTrafficService gateTrafficService;

    @Override
    public ResponseEntity<GateTrafficDto> add(GateTrafficParam gateTrafficParam) {
        return new ResponseEntity<>(gateTrafficService.add(gateTrafficParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<GateTrafficDto> update(GateTrafficParam gateTrafficParam) {
        return new ResponseEntity<>(gateTrafficService.update(gateTrafficParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<GateTrafficDto> delete(GateTrafficParam gateTrafficParam) {
        return new ResponseEntity<>(gateTrafficService.delete(gateTrafficParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<GateTrafficDto>> getAll(BasePagedParam pagingParam) {
        return new ResponseEntity<>(gateTrafficService.getAll(pagingParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<GateTrafficDto> getById(Long id) {
        return new ResponseEntity<>(gateTrafficService.getById(id), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Page<GateTrafficDto>> query(BaseQuery<?> filter) {
        return new ResponseEntity<>(gateTrafficService.query(filter), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getByGate")
    public ResponseEntity<GateTrafficDto> getLatestTraficByGate(GateParam gateParam) {
        return new ResponseEntity<GateTrafficDto>(gateTrafficService.getLatestByGateId(gateParam.getId()), HttpStatus.OK);
    }
}
