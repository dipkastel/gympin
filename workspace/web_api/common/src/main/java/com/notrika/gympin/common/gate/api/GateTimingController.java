package com.notrika.gympin.common.gate.api;

import com.notrika.gympin.common._base.base.BaseController;
import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.gate.dto.GateTimingDto;
import com.notrika.gympin.common.gate.param.GateParam;
import com.notrika.gympin.common.gate.param.GateTimingParam;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface GateTimingController extends BaseController<GateTimingParam, GateTimingDto, BaseQuery<?>> {


    ResponseEntity<List<GateTimingDto>> getTimingByGate(GateParam gateParam);

    ResponseEntity<List<GateTimingDto>> getTimingByPlace(PlaceParam placeParam);

    ResponseEntity<List<GateTimingDto>> addAll(@RequestBody List<GateTimingParam> gateParam);
}
