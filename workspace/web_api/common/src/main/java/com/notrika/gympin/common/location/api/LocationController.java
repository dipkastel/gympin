package com.notrika.gympin.common.location.api;

import com.notrika.gympin.common.location.dto.*;
import com.notrika.gympin.common.location.param.*;
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

    ResponseEntity<OptionOfPlaceDto> addOptionOfPlace(OptionOfPlaceParam optionOfPlaceParam);
}
