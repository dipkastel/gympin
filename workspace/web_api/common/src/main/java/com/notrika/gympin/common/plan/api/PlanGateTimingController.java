package com.notrika.gympin.common.plan.api;

import com.notrika.gympin.common._base.base.BaseController;
import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.plan.dto.PlanGateTimingDto;
import com.notrika.gympin.common.plan.param.PlanGateTimingParam;
import com.notrika.gympin.common.plan.param.PlanParam;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface PlanGateTimingController extends BaseController<PlanGateTimingParam, PlanGateTimingDto, BaseQuery<?>> {
        ResponseEntity<List<PlanGateTimingDto>> getByPlan(PlanParam planParam);
        ResponseEntity<List<PlanGateTimingDto>> addAll(@RequestBody List<PlanGateTimingParam> gateParam);
}
