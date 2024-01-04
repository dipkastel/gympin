package com.notrika.gympin.common.place.placeSport.service;

import com.notrika.gympin.common.place.placeSport.param.PlaceSportParam;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.util._base.base.BaseService;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.place.placeSport.dto.PlaceSportDto;

import java.util.List;

public interface PlaceSportService extends BaseService<PlaceSportParam, PlaceSportDto, BaseQuery<?>> {

    List<PlaceSportDto> getSportsByPlace(PlaceParam placeParam);

}
