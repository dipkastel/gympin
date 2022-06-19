package com.notrika.gympin.controller.impl.plan;

import com.notrika.gympin.common.BasePagedParam;
import com.notrika.gympin.common.plan.api.PlanGateController;
import com.notrika.gympin.common.plan.dto.PlanGateDto;
import com.notrika.gympin.common.plan.param.PlanGateParam;
import com.notrika.gympin.common.plan.service.PlanGateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/plan-gate")
public class PlanGateControllerImpl implements PlanGateController {

    @Autowired
    private PlanGateService planService;

    @Override
    public ResponseEntity<PlanGateDto> add(PlanGateParam planGateParam) {
        return ResponseEntity.ok(planService.add(planGateParam));
    }

    @Override
    public ResponseEntity<PlanGateDto> update(PlanGateParam planGateParam) {
        return ResponseEntity.ok(planService.update(planGateParam));
    }

    @Override
    public ResponseEntity<PlanGateDto> delete(PlanGateParam planGateParam) {
        return ResponseEntity.ok(planService.delete(planGateParam));
    }

    @Override
    public ResponseEntity<List<PlanGateDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(planService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<PlanGateDto> getById(Long id) {
        return ResponseEntity.ok(planService.getById(id));
    }
}
