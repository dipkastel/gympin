package com.notrika.gympin.common.gate.api;

import com.notrika.gympin.common._base.base.BaseController;
import com.notrika.gympin.common.gate.dto.GateDto;
import com.notrika.gympin.common.gate.filter.GateFilter;
import com.notrika.gympin.common.gate.param.GateParam;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.sport.param.SportParam;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface GateController extends BaseController<GateParam, GateDto, GateFilter> {

    ResponseEntity<List<GateDto>> getGatesByPlace(PlaceParam place);

    ResponseEntity<List<GateDto>> getGatesBySport(SportParam sport);

}
