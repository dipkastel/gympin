package com.notrika.gympin.common.location.api;

import com.notrika.gympin.common.BaseController;
import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.location.dto.PlaceDto;
import com.notrika.gympin.common.location.dto.PlaceOwnerDto;
import com.notrika.gympin.common.location.param.PlaceOwnerParam;
import com.notrika.gympin.common.location.param.PlaceParam;
import com.notrika.gympin.common.location.param.RegionParam;
import com.notrika.gympin.common.sport.dto.SportDto;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.param.UserParam;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface PlaceController extends BaseController<PlaceParam, PlaceDto, BaseFilter<?>> {

    ResponseEntity<List<PlaceDto>> getPlacesByRegion(RegionParam regionParam);

    ResponseEntity<List<PlaceDto>> getPlaceByUser(UserParam userParam);

    ResponseEntity<PlaceOwnerDto> addPlaceOwner(PlaceOwnerParam placeOwnerParam);

    ResponseEntity<List<UserDto>> getOwnersPlace(PlaceParam placeParam);

    ResponseEntity<PlaceOwnerDto> deletePlaceOwner(PlaceOwnerParam placeOwnerParam);

    ResponseEntity<List<SportDto>> getSportsOfPlace(PlaceDto place);

}
