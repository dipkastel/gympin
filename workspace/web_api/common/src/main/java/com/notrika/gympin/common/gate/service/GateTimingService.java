package com.notrika.gympin.common.gate.service;

import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common._base.base.BaseService;
import com.notrika.gympin.common.gate.dto.GateTimingDto;
import com.notrika.gympin.common.gate.param.GateTimingParam;

import java.util.List;

public interface GateTimingService extends BaseService<GateTimingParam, GateTimingDto, BaseQuery<?>> {


    List<GateTimingDto> getByGateId(Long id);

    List<GateTimingDto> getByPlaceId(Long id);
}
