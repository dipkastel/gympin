package com.notrika.gympin.common.location.service;

import com.notrika.gympin.common.BaseService;
import com.notrika.gympin.common.location.dto.PlaceDto;
import com.notrika.gympin.common.location.dto.StateDto;
import com.notrika.gympin.common.location.param.PlaceParam;
import com.notrika.gympin.common.location.param.RegionParam;
import com.notrika.gympin.common.sport.param.SportParam;

import java.util.List;

public interface PlaceService extends BaseService<PlaceParam, PlaceDto> {

    List<PlaceDto> getPlacesByRegion(RegionParam regionParam);
}
