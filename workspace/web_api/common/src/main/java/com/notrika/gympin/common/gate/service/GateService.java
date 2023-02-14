package com.notrika.gympin.common.gate.service;

import com.notrika.gympin.common._base.base.BaseService;
import com.notrika.gympin.common.gate.dto.GateDto;
import com.notrika.gympin.common.gate.dto.GateTimingDto;
import com.notrika.gympin.common.gate.filter.GateFilter;
import com.notrika.gympin.common.gate.param.GateParam;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.sport.param.SportParam;
import com.notrika.gympin.common.user.param.UserParam;

import java.util.List;

public interface GateService extends BaseService<GateParam, GateDto, GateFilter> {

    List<GateTimingDto> getGateTimings(GateParam gate);

    List<GateDto> getGatesByPlace(PlaceParam place);

    List<GateDto> getGatesBySport(SportParam sport);

    List<GateDto> getGatesByOwner(UserParam owner);

    List<GateDto> getGatesByGuard(UserParam guard);

}
