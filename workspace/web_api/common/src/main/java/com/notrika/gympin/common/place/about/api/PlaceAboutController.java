package com.notrika.gympin.common.place.about.api;

import com.notrika.gympin.common.util._base.base.BaseController;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.place.about.dto.PlaceAboutDto;
import com.notrika.gympin.common.place.about.param.PlaceAboutParam;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface PlaceAboutController extends BaseController<PlaceAboutParam, PlaceAboutDto, BaseQuery<?>> {


    ResponseEntity<List<PlaceAboutDto>> getAboutByPlace(PlaceParam placeParam);
    ResponseEntity<List<PlaceAboutDto>> getAllAboutByPlaces(List<PlaceParam> placeParam);
}
