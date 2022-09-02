package com.notrika.gympin.common.location.service;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.BaseService;
import com.notrika.gympin.common.location.dto.GateDto;
import com.notrika.gympin.common.location.dto.GateTimingDto;
import com.notrika.gympin.common.location.filter.GateFilter;
import com.notrika.gympin.common.location.param.GateParam;
import com.notrika.gympin.common.location.param.PlaceParam;
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
