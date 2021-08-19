package com.notrika.gympin.common.location.service;

import com.notrika.gympin.common.location.dto.*;
import com.notrika.gympin.common.location.param.*;
import com.notrika.gympin.common.user.param.UserParam;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface LocationService {

    StateDto addState(StateParam stateDto);

    List<StateDto> getAllState();

    CityDto addCity(CityParam cityDto);

    List<CityDto> getAllCity();

    List<CityDto> getCitiesByState(StateParam stateParam);

    RegionDto addRegion(RegionParam regionDto);

    List<RegionDto> getAllRegion();

    List<RegionDto> getRegionsByCity(CityParam cityParam);

    PlaceDto addPlace(PlaceParam placeDto);

    List<PlaceDto> getAllPlace();

    List<PlaceDto> getPlacesByRegion(RegionParam regionParam);

    OptionOfPlaceDto addOptionOfPlace(OptionOfPlaceParam optionOfPlaceParam);

    List<PlaceDto> getPlaceByUser(UserParam userParam);
}
