package com.notrika.gympin.common.gate.api;

import com.notrika.gympin.common._base.base.BaseController;
import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.gate.dto.GateTrafficDto;
import com.notrika.gympin.common.gate.param.GateParam;
import com.notrika.gympin.common.gate.param.GateTrafficParam;
import org.springframework.http.ResponseEntity;

public interface GateTrafficController extends BaseController<GateTrafficParam, GateTrafficDto, BaseQuery<?>> {


    ResponseEntity<GateTrafficDto> getLatestTraficByGate(GateParam gateParam);

}
