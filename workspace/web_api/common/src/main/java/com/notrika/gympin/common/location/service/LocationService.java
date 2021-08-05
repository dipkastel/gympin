package com.notrika.gympin.common.location.service;

import com.notrika.gympin.common.location.dto.CityDto;
import com.notrika.gympin.common.location.dto.PlaceDto;
import com.notrika.gympin.common.location.dto.RegionDto;
import com.notrika.gympin.common.location.dto.StateDto;
import com.notrika.gympin.common.location.param.CityParam;
import com.notrika.gympin.common.location.param.PlaceParam;
import com.notrika.gympin.common.location.param.RegionParam;
import com.notrika.gympin.common.location.param.StateParam;

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
}
