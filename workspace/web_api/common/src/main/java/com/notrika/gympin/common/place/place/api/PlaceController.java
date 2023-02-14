package com.notrika.gympin.common.place.place.api;

import com.notrika.gympin.common._base.base.BaseController;
import com.notrika.gympin.common.location.param.LocationParam;
import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.place.place.dto.PlaceDto;
import com.notrika.gympin.common.place.place.param.PlaceMultimediaParam;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.place.place.query.PlaceQuery;
import com.notrika.gympin.common.sport.dto.SportDto;
import com.notrika.gympin.common.user.param.UserParam;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface PlaceController extends BaseController<PlaceParam, PlaceDto, PlaceQuery> {

    ResponseEntity<PlaceDto> changeStatus(@RequestBody PlaceParam place);

    ResponseEntity<List<PlaceDto>> getPlacesByLocation(LocationParam regionParam);

    ResponseEntity<List<PlaceDto>> getPlaceByUser(UserParam userParam);

    ResponseEntity<List<SportDto>> getSportsOfPlace(PlaceDto place);

    ResponseEntity<List<MultimediaDto>> getMultimedias(PlaceParam place);

    ResponseEntity<PlaceDto> addMultimedia(@RequestBody PlaceMultimediaParam place);

    ResponseEntity<PlaceDto> deleteMultimedia(@RequestBody PlaceMultimediaParam place);

}
