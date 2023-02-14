package com.notrika.gympin.common.plan.service;

import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common._base.base.BaseService;
import com.notrika.gympin.common.plan.dto.PlanGateTimingDto;
import com.notrika.gympin.common.plan.param.PlanGateTimingParam;
import com.notrika.gympin.common.plan.param.PlanParam;

import java.util.List;

public interface PlanGateTimingService extends BaseService<PlanGateTimingParam, PlanGateTimingDto, BaseQuery<?>> {

    List<PlanGateTimingDto> getByPlan(PlanParam planParam);
    List<PlanGateTimingDto> add(List<PlanGateTimingParam> planGateTimingParams);

}
