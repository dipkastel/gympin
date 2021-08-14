package com.notrika.gympin.controller.impl.location;

import com.notrika.gympin.common.location.api.LocationController;
import com.notrika.gympin.common.location.dto.CityDto;
import com.notrika.gympin.common.location.dto.PlaceDto;
import com.notrika.gympin.common.location.dto.RegionDto;
import com.notrika.gympin.common.location.dto.StateDto;
import com.notrika.gympin.common.location.param.CityParam;
import com.notrika.gympin.common.location.param.PlaceParam;
import com.notrika.gympin.common.location.param.RegionParam;
import com.notrika.gympin.common.location.param.StateParam;
import com.notrika.gympin.common.location.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/location")
public class LocationControllerImpl implements LocationController {

    @Autowired
    private LocationService locationService;

    @Override
    @PostMapping("/addState")
    public ResponseEntity<StateDto> addState(@RequestBody StateParam stateParam) {
        return new ResponseEntity<StateDto>(locationService.addState(stateParam), HttpStatus.CREATED);
    }

    @Override
    @GetMapping("/getAllState")
    public ResponseEntity<List<StateDto>> getAllState() {
        return new ResponseEntity<List<StateDto>>(locationService.getAllState(), HttpStatus.OK);
    }

    @Override
    @PostMapping("/addCity")
    public ResponseEntity<CityDto> addCity(@RequestBody CityParam cityParam) {
        return new ResponseEntity<CityDto>(locationService.addCity(cityParam), HttpStatus.CREATED);
    }

    @Override
    @GetMapping("/getAllCity")
    public ResponseEntity<List<CityDto>> getAllCity() {
        return new ResponseEntity<List<CityDto>>(locationService.getAllCity(), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getCitiesByState")
    public ResponseEntity<List<CityDto>> getCitiesByState(StateParam stateParam) {
        return new ResponseEntity<List<CityDto>>(locationService.getCitiesByState(stateParam), HttpStatus.OK);
    }

    @Override
    @PostMapping("/addRegion")
    public ResponseEntity<RegionDto> addRegion(@RequestBody RegionParam regionParam) {
        return new ResponseEntity<RegionDto>(locationService.addRegion(regionParam), HttpStatus.CREATED);
    }

    @Override
    @GetMapping("/getAllRegion")
    public ResponseEntity<List<RegionDto>> getAllRegion() {
        return new ResponseEntity<List<RegionDto>>(locationService.getAllRegion(), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getRegionsByCity")
    public ResponseEntity<List<RegionDto>> getRegionsByCity(CityParam cityParam) {
        return new ResponseEntity<List<RegionDto>>(locationService.getRegionsByCity(cityParam), HttpStatus.OK);
    }

    @Override
    @PostMapping("/addPlace")
    public ResponseEntity<PlaceDto> addPlace(@RequestBody PlaceParam placeParam) {
        return new ResponseEntity<PlaceDto>(locationService.addPlace(placeParam), HttpStatus.CREATED);
    }

    @Override
    @GetMapping("/getAllPlace")
    public ResponseEntity<List<PlaceDto>> getAllPlace() {
        return new ResponseEntity<List<PlaceDto>>(locationService.getAllPlace(), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getPlacesByRegion")
    public ResponseEntity<List<PlaceDto>> getPlacesByRegion(RegionParam regionParam) {
        return new ResponseEntity<List<PlaceDto>>(locationService.getPlacesByRegion(regionParam), HttpStatus.OK);
    }
}
