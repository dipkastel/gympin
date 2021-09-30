package com.notrika.gympin.common.sportplace.service;

import com.notrika.gympin.common.BaseService;
import com.notrika.gympin.common.location.param.PlaceParam;
import com.notrika.gympin.common.sport.dto.SportDto;
import com.notrika.gympin.common.sportplace.dto.SportPlaceDto;
import com.notrika.gympin.common.sportplace.param.SportPlaceParam;

import java.util.List;

public interface SportPlaceService extends BaseService<SportPlaceParam, SportPlaceDto> {

    List<SportDto> getSportsByPlace(PlaceParam placeParam);

}
