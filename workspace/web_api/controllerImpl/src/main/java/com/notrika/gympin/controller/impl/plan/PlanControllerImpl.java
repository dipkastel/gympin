package com.notrika.gympin.controller.impl.plan;

import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common._base.param.BasePagedParam;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.plan.api.PlanController;
import com.notrika.gympin.common.plan.dto.PlanDto;
import com.notrika.gympin.common.plan.param.PlanParam;
import com.notrika.gympin.common.plan.param.PlanSportParam;
import com.notrika.gympin.common.plan.service.PlanService;
import com.notrika.gympin.common.sportplace.dto.SportPlaceDto;
import com.notrika.gympin.common.sportplace.param.SportPlaceParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<Page<PlanDto>> query(BaseQuery<?> filter) {
        return null;
    }


    @Override
    @GetMapping("/getPlansByPlace")
    public ResponseEntity<List<PlanDto>> getPlanByPlace(PlaceParam place) {
        return ResponseEntity.ok(planService.getPlanByPlace(place));
    }

    @Override
    @GetMapping("/getSports")
    public ResponseEntity<List<SportPlaceDto>> getSports(Long PlanId) {
        return ResponseEntity.ok(planService.getSports(PlanId));
    }

    @Override
    @PostMapping("/addSport")
    public ResponseEntity<PlanDto> addSport(@RequestBody PlanSportParam planSportParam) {
        return ResponseEntity.ok(planService.addSport(planSportParam));
    }

    @Override
    @PutMapping("/deleteSport")
    public ResponseEntity<PlanDto> deleteSport(@RequestBody PlanSportParam planSportParam) {
        return ResponseEntity.ok(planService.deleteSport(planSportParam));
    }

}
