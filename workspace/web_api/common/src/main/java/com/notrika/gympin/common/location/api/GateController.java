package com.notrika.gympin.common.location.api;

import com.notrika.gympin.common.BaseController;
import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.location.dto.GateDto;
import com.notrika.gympin.common.location.filter.GateFilter;
import com.notrika.gympin.common.location.param.GateParam;
import com.notrika.gympin.common.location.param.PlaceParam;
import com.notrika.gympin.common.sport.param.SportParam;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface GateController extends BaseController<GateParam, GateDto, GateFilter> {

    ResponseEntity<List<GateDto>> getGatesByPlace(PlaceParam place);

    ResponseEntity<List<GateDto>> getGatesBySport(SportParam sport);

}
