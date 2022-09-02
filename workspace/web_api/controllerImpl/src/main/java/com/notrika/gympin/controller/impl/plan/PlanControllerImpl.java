package com.notrika.gympin.controller.impl.plan;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.BasePagedParam;
import com.notrika.gympin.common.plan.api.PlanController;
import com.notrika.gympin.common.plan.dto.PlanDto;
import com.notrika.gympin.common.plan.param.PlanParam;
import com.notrika.gympin.common.plan.service.PlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/plan")
public class PlanControllerImpl implements PlanController {

    @Autowired
    private PlanService planService;

    @Override
    public ResponseEntity<PlanDto> add(PlanParam planParam) {
        return ResponseEntity.ok(planService.add(planParam));
    }

    @Override
    public ResponseEntity<PlanDto> update(PlanParam planParam) {
        return ResponseEntity.ok(planService.update(planParam));
    }

    @Override
    public ResponseEntity<PlanDto> delete(PlanParam planParam) {
        return ResponseEntity.ok(planService.delete(planParam));
    }

    @Override
    public ResponseEntity<List<PlanDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(planService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<PlanDto> getById(Long id) {
        return ResponseEntity.ok(planService.getById(id));
    }

    @Override
    public ResponseEntity<Long> countSearch() {
        return null;
    }

    @Override
    public ResponseEntity<List<PlanDto>> search(BaseFilter<?> filter) {
        return null;
    }

    @Override
    public ResponseEntity<Long> countFilter(BaseFilter<?> filter) {
        return null;
    }

    @Override
    public ResponseEntity<List<PlanDto>> filter(BaseFilter<?> filter) {
        return null;
    }
}
