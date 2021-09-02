package com.notrika.gympin.common.location.api;

import com.notrika.gympin.common.BaseDto;
import com.notrika.gympin.common.location.dto.*;
import com.notrika.gympin.common.location.param.*;
import com.notrika.gympin.common.primitive.param.LongParam;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.param.UserParam;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface LocationController {

    ResponseEntity<StateDto> addState(StateParam stateParam);

    ResponseEntity<StateDto> updateState(StateParam stateParam);

    ResponseEntity<List<StateDto>> getAllState();

    ResponseEntity<StateDto> getStateById(LongParam longParam);

    ResponseEntity<BaseDto> deleteState(StateParam stateParam);

    ResponseEntity<CityDto> addCity(CityParam cityParam);

    ResponseEntity<CityDto> updateCity(CityParam cityParam);

    ResponseEntity<CityDto> getCityById(LongParam longParam);

    ResponseEntity<BaseDto> deleteCity(CityParam cityParam);

    ResponseEntity<List<CityDto>> getAllCity();

    ResponseEntity<List<CityDto>> getCitiesByState(StateParam stateParam);

    ResponseEntity<RegionDto> addRegion(RegionParam regionParam);

    ResponseEntity<RegionDto> updateRegion(RegionParam regionParam);

    ResponseEntity<List<RegionDto>> getAllRegion();

    ResponseEntity<RegionDto> getRegionById(LongParam longParam);

    ResponseEntity<List<RegionDto>> getRegionsByCity(CityParam cityParam);

    ResponseEntity<BaseDto> deleteRegion(RegionParam regionParam);

    ResponseEntity<PlaceDto> addPlace(PlaceParam placeParam);

    ResponseEntity<PlaceDto> updatePlace(PlaceParam placeParam);

    ResponseEntity<List<PlaceDto>> getAllPlace();

    ResponseEntity<PlaceDto> getPlaceById(LongParam longParam);

    ResponseEntity<List<PlaceDto>> getPlacesByRegion(RegionParam regionParam);

    ResponseEntity<BaseDto> deletePlace(PlaceParam placeParam);

    ResponseEntity<OptionOfPlaceDto> addOptionOfPlace(OptionOfPlaceParam optionOfPlaceParam);

    ResponseEntity<List<PlaceDto>> getPlaceByUser(UserParam userParam);

    ResponseEntity<PlaceOwnerDto> addPlaceOwner(PlaceOwnerParam placeOwnerParam);

    ResponseEntity<List<UserDto>> getOwnersPlace(PlaceParam placeParam);
}
