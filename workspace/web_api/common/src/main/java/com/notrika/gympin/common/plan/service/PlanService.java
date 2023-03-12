package com.notrika.gympin.common.plan.service;

import com.notrika.gympin.common._base.base.BaseService;
import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.plan.dto.PlanDto;
import com.notrika.gympin.common.plan.param.PlanParam;
import com.notrika.gympin.common.plan.param.PlanSportParam;
import com.notrika.gympin.common.plan.query.PlanQuery;
import com.notrika.gympin.common.sportplace.dto.SportPlaceDto;

import java.util.List;

public interface PlanService extends BaseService<PlanParam, PlanDto, PlanQuery> {

    List<PlanDto> getPlanByPlace(PlaceParam place);

    List<SportPlaceDto> getSports(Long planId);
    PlanDto addSport(PlanSportParam planSportParam);
    PlanDto deleteSport(PlanSportParam planSportParam);
}
