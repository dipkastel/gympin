package com.notrika.gympin.common.sportplace.api;

import com.notrika.gympin.common._base.base.BaseController;
import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.sportplace.dto.SportPlaceDto;
import com.notrika.gympin.common.sportplace.param.SportPlaceParam;
import org.springframework.http.ResponseEntity;

import java.util.List;


public interface SportPlaceController extends BaseController<SportPlaceParam, SportPlaceDto, BaseQuery<?>> {

    ResponseEntity<List<SportPlaceDto>> getSportsByPlace(PlaceParam placeParam);

}
