package com.notrika.gympin.common.gate.service;

import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common._base.base.BaseService;
import com.notrika.gympin.common.gate.dto.GateTrafficDto;
import com.notrika.gympin.common.gate.param.GateTrafficParam;

public interface GateTrafficService extends BaseService<GateTrafficParam, GateTrafficDto, BaseQuery<?>> {


    GateTrafficDto getLatestByGateId(Long id);

}
