package com.notrika.gympin.common.location.service;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.BaseService;
import com.notrika.gympin.common.location.dto.PlaceDto;
import com.notrika.gympin.common.location.param.PlaceParam;
import com.notrika.gympin.common.location.param.RegionParam;
import com.notrika.gympin.common.plan.dto.PlanGateDto;
import com.notrika.gympin.common.sport.dto.SportDto;

import java.util.List;

public interface PlaceService extends BaseService<PlaceParam, PlaceDto, BaseFilter<?>> {

    List<PlaceDto> getPlacesByRegion(RegionParam regionParam);

    List<SportDto> getSportsOfPlace(PlaceDto place);

    List<PlanGateDto> getPlansOfPlace(PlaceParam place);

}
