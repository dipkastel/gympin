package com.notrika.gympin.common.place.personnel.api;

import com.notrika.gympin.common._base.base.BaseController;
import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.place.personnel.dto.PlacePersonnelAccessDto;
import com.notrika.gympin.common.place.personnel.dto.PlacePersonnelDto;
import com.notrika.gympin.common.place.personnel.param.PlacePersonnelAccessParam;
import com.notrika.gympin.common.place.personnel.param.PlacePersonnelParam;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface PlacePersonnelController extends BaseController<PlacePersonnelParam, PlacePersonnelDto, BaseQuery<?>> {

    ResponseEntity<List<PlacePersonnelDto>> getPersonnelByPlace(PlaceParam placeParam);

    ResponseEntity<List<PlacePersonnelAccessDto>> getUserPlaceAccess(Long placeId,Long userId);

    ResponseEntity<List<PlacePersonnelAccessDto>> updatePersonnelAccess(@RequestBody List<PlacePersonnelAccessParam> param);
}