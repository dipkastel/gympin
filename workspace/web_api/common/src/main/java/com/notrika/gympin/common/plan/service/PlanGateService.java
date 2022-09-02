package com.notrika.gympin.common.plan.service;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.BaseService;
import com.notrika.gympin.common.location.dto.GateDto;
import com.notrika.gympin.common.location.param.GateParam;
import com.notrika.gympin.common.plan.dto.PlanDto;
import com.notrika.gympin.common.plan.dto.PlanGateDto;
import com.notrika.gympin.common.plan.param.PlanGateParam;

import java.util.List;

public interface PlanGateService extends BaseService<PlanGateParam, PlanGateDto, BaseFilter<?>> {

    List<PlanGateDto> getPlanesByGate(GateParam gate);

}
