package com.notrika.gympin.controller.impl.plan;

import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common._base.param.BasePagedParam;
import com.notrika.gympin.common.plan.api.PlanGateTimingController;
import com.notrika.gympin.common.plan.dto.PlanGateTimingDto;
import com.notrika.gympin.common.plan.param.PlanGateTimingParam;
import com.notrika.gympin.common.plan.param.PlanParam;
import com.notrika.gympin.common.plan.service.PlanGateTimingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/plan-gate-timing")
public class PlanGateTimingControllerImpl implements PlanGateTimingController {

    @Autowired
    private PlanGateTimingService planGateTimingService;

    @Override
    public ResponseEntity<PlanGateTimingDto> add(PlanGateTimingParam planGateParam) {
        return ResponseEntity.ok(planGateTimingService.add(planGateParam));
    }
    @Override
    @PostMapping("/addAll")
    public ResponseEntity<List<PlanGateTimingDto>> addAll(List<PlanGateTimingParam> gateParam) {
        return ResponseEntity.ok(planGateTimingService.add(gateParam));
    }

    @Override
    public ResponseEntity<PlanGateTimingDto> update(PlanGateTimingParam planGateParam) {
        return ResponseEntity.ok(planGateTimingService.update(planGateParam));
    }

    @Override
    public ResponseEntity<PlanGateTimingDto> delete(PlanGateTimingParam planGateParam) {
        return ResponseEntity.ok(planGateTimingService.delete(planGateParam));
    }

    @Override
    public ResponseEntity<List<PlanGateTimingDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(planGateTimingService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<PlanGateTimingDto> getById(Long id) {
        return ResponseEntity.ok(planGateTimingService.getById(id));
    }

    @Override
    public ResponseEntity<Page<PlanGateTimingDto>> query(BaseQuery<?> filter) {
        return null;
    }

    @Override
    @GetMapping("/getByPlan")
    public ResponseEntity<List<PlanGateTimingDto>> getByPlan(PlanParam planParam) {
        return ResponseEntity.ok(planGateTimingService.getByPlan(planParam));
    }

}
