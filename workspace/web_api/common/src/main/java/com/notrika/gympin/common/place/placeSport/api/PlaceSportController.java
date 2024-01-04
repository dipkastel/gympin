package com.notrika.gympin.common.place.placeSport.api;

import com.notrika.gympin.common.place.placeSport.dto.PlaceSportDto;
import com.notrika.gympin.common.place.placeSport.param.PlaceSportParam;
import com.notrika.gympin.common.util._base.base.BaseController;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import org.springframework.http.ResponseEntity;

import java.util.List;


public interface PlaceSportController extends BaseController<PlaceSportParam, PlaceSportDto, BaseQuery<?>> {

    ResponseEntity<List<PlaceSportDto>> getSportsByPlace(PlaceParam placeParam);

}
