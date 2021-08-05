package com.notrika.gympin.common.location.api;

import com.notrika.gympin.common.location.dto.CityDto;
import com.notrika.gympin.common.location.dto.PlaceDto;
import com.notrika.gympin.common.location.dto.RegionDto;
import com.notrika.gympin.common.location.dto.StateDto;
import com.notrika.gympin.common.location.param.CityParam;
import com.notrika.gympin.common.location.param.PlaceParam;
import com.notrika.gympin.common.location.param.RegionParam;
import com.notrika.gympin.common.location.param.StateParam;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface LocationController {
    ResponseEntity<StateDto> addState(StateParam stateParam);

    ResponseEntity<List<StateDto>> getAllState();

    ResponseEntity<CityDto> addCity(CityParam cityParam);

    ResponseEntity<List<CityDto>> getAllCity();

    ResponseEntity<List<CityDto>> getCitiesByState(StateParam stateParam);

    ResponseEntity<RegionDto> addRegion(RegionParam regionParam);

    ResponseEntity<List<RegionDto>> getAllRegion();

    ResponseEntity<List<RegionDto>> getRegionsByCity(CityParam cityParam);

    ResponseEntity<PlaceDto> addPlace(PlaceParam placeParam);

    ResponseEntity<List<PlaceDto>> getAllPlace();

    ResponseEntity<List<PlaceDto>> getPlacesByRegion(RegionParam regionParam);
}
