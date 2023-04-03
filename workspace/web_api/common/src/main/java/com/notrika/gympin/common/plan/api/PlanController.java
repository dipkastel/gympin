package com.notrika.gympin.common.plan.api;

import com.notrika.gympin.common._base.base.BaseController;
import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.plan.dto.PlanDiscountHistoryDto;
import com.notrika.gympin.common.plan.dto.PlanDto;
import com.notrika.gympin.common.plan.param.PlanParam;
import com.notrika.gympin.common.plan.param.PlanSportParam;
import com.notrika.gympin.common.plan.query.PlanQuery;
import com.notrika.gympin.common.sportplace.dto.SportPlaceDto;
import com.notrika.gympin.common.sportplace.param.SportPlaceParam;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface PlanController extends BaseController<PlanParam, PlanDto, PlanQuery> {

    ResponseEntity<List<PlanDto>> getPlanByPlace(PlaceParam place);
    ResponseEntity<List<SportPlaceDto>> getSports(Long planId);
    ResponseEntity<PlanDto> addSport(PlanSportParam planSportParam);
    ResponseEntity<PlanDto> deleteSport(PlanSportParam planSportParam);
    ResponseEntity<List<PlanDiscountHistoryDto>> getPlanDiscountHistory(Long planId);
    ResponseEntity<PlanDto> PlanStatusChange(PlanParam planParam);
}
