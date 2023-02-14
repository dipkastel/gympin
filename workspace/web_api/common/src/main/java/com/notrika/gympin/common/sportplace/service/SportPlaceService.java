package com.notrika.gympin.common.sportplace.service;

import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common._base.base.BaseService;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.sportplace.dto.SportPlaceDto;
import com.notrika.gympin.common.sportplace.param.SportPlaceParam;

import java.util.List;

public interface SportPlaceService extends BaseService<SportPlaceParam, SportPlaceDto, BaseQuery<?>> {

    List<SportPlaceDto> getSportsByPlace(PlaceParam placeParam);

}
