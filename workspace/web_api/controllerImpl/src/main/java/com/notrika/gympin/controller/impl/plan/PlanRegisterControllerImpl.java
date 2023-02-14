package com.notrika.gympin.controller.impl.plan;

import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common._base.param.BasePagedParam;
import com.notrika.gympin.common.plan.api.PlanRegisterController;
import com.notrika.gympin.common.plan.dto.PlanRegisterDto;
import com.notrika.gympin.common.plan.param.PlanRegisterParam;
import com.notrika.gympin.common.plan.service.PlanRegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/plan-register")
public class PlanRegisterControllerImpl implements PlanRegisterController {

    @Autowired
    private PlanRegisterService planRegisterService;

    @Override
    public ResponseEntity<PlanRegisterDto> add(PlanRegisterParam param) {
        return ResponseEntity.ok(planRegisterService.add(param));
    }

    @Override
    public ResponseEntity<PlanRegisterDto> update(PlanRegisterParam param) {
        return ResponseEntity.ok(planRegisterService.update(param));
    }

    @Override
    public ResponseEntity<PlanRegisterDto> delete(PlanRegisterParam param) {
        return ResponseEntity.ok(planRegisterService.delete(param));
    }

    @Override
    public ResponseEntity<List<PlanRegisterDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(planRegisterService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<PlanRegisterDto> getById(Long id) {
        return ResponseEntity.ok(planRegisterService.getById(id));
    }

    @Override
    public ResponseEntity<Page<PlanRegisterDto>> query(BaseQuery<?> filter) {
        return null;
    }

}
