package com.notrika.gympin.common.location.service;

import com.notrika.gympin.common.location.dto.*;
import com.notrika.gympin.common.location.param.*;
import com.notrika.gympin.common.primitive.param.LongParam;
import com.notrika.gympin.common.user.param.UserParam;

import java.util.List;

public interface LocationService {

    StateDto addState(StateParam stateParam);

    StateDto updateState(StateParam stateParam);

    List<StateDto> getAllState();

    StateDto getStateById(LongParam longParam);

    void deleteState(StateParam stateParam);

    CityDto addCity(CityParam cityParam);

    CityDto updateCity(CityParam cityParam);

    CityDto getCityById(LongParam longParam);

    void deleteCity(CityParam cityParam);

    List<CityDto> getAllCity();

    List<CityDto> getCitiesByState(StateParam stateParam);

    RegionDto addRegion(RegionParam regionParam);

    RegionDto updateRegion(RegionParam regionParam);

    List<RegionDto> getAllRegion();

    RegionDto getRegionById(LongParam longParam);

    List<RegionDto> getRegionsByCity(CityParam cityParam);

    void deleteRegion(RegionParam regionParam);

    PlaceDto addPlace(PlaceParam placeParam);

    PlaceDto updatePlace(PlaceParam placeParam);

    List<PlaceDto> getAllPlace();

    PlaceDto getPlaceById(LongParam longParam);

    List<PlaceDto> getPlacesByRegion(RegionParam regionParam);

    void deletePlace(PlaceParam placeParam);

    OptionOfPlaceDto addOptionOfPlace(OptionOfPlaceParam optionOfPlaceParam);

    List<PlaceDto> getPlaceByUser(UserParam userParam);
}
