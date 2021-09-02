package com.notrika.gympin.controller.impl.location;

import com.notrika.gympin.common.BaseDto;
import com.notrika.gympin.common.location.api.LocationController;
import com.notrika.gympin.common.location.dto.*;
import com.notrika.gympin.common.location.param.*;
import com.notrika.gympin.common.location.service.LocationService;
import com.notrika.gympin.common.primitive.param.LongParam;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.param.UserParam;
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

    //state

    @Override
    //@RolesAllowed({"ADMIN"})
    @PostMapping("/addState")
    public ResponseEntity<StateDto> addState(@RequestBody StateParam stateParam) {
        return new ResponseEntity<StateDto>(locationService.addState(stateParam), HttpStatus.CREATED);
    }

    @Override
    //@RolesAllowed({"ADMIN"})
    @PutMapping("/updateState")
    public ResponseEntity<StateDto> updateState(@RequestBody StateParam stateParam) {
        return new ResponseEntity<StateDto>(locationService.updateState(stateParam), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getAllState")
    public ResponseEntity<List<StateDto>> getAllState() {
        return new ResponseEntity<List<StateDto>>(locationService.getAllState(), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getStateById")
    public ResponseEntity<StateDto> getStateById(LongParam longParam) {
        return new ResponseEntity<StateDto>(locationService.getStateById(longParam), HttpStatus.OK);
    }

    @Override
    //@RolesAllowed({"ADMIN"})
    @DeleteMapping("/deleteState")
    public ResponseEntity<BaseDto> deleteState(StateParam stateParam) {
        locationService.deleteState(stateParam);
        return new ResponseEntity<BaseDto>(BaseDto.builder().id(stateParam.getId()).build(), HttpStatus.OK);
    }

    //city

    @Override
    @PostMapping("/addCity")
    public ResponseEntity<CityDto> addCity(@RequestBody CityParam cityParam) {
        return new ResponseEntity<CityDto>(locationService.addCity(cityParam), HttpStatus.CREATED);
    }

    @Override
    @PutMapping("/updateCity")
    public ResponseEntity<CityDto> updateCity(@RequestBody CityParam cityParam) {
        return new ResponseEntity<CityDto>(locationService.updateCity(cityParam), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getCityById")
    public ResponseEntity<CityDto> getCityById(LongParam longParam) {
        return new ResponseEntity<CityDto>(locationService.getCityById(longParam), HttpStatus.OK);
    }

    @Override
    @DeleteMapping("/deleteCity")
    public ResponseEntity<BaseDto> deleteCity(CityParam cityParam) {
        locationService.deleteCity(cityParam);
        return new ResponseEntity<BaseDto>(BaseDto.builder().id(cityParam.getId()).build(), HttpStatus.OK);
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

    //region

    @Override
    @PostMapping("/addRegion")
    public ResponseEntity<RegionDto> addRegion(@RequestBody RegionParam regionParam) {
        return new ResponseEntity<RegionDto>(locationService.addRegion(regionParam), HttpStatus.CREATED);
    }

    @Override
    @PutMapping("/updateRegion")
    public ResponseEntity<RegionDto> updateRegion(@RequestBody RegionParam regionParam) {
        return new ResponseEntity<RegionDto>(locationService.updateRegion(regionParam), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getAllRegion")
    public ResponseEntity<List<RegionDto>> getAllRegion() {
        return new ResponseEntity<List<RegionDto>>(locationService.getAllRegion(), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getRegionById")
    public ResponseEntity<RegionDto> getRegionById(LongParam longParam) {
        return new ResponseEntity<RegionDto>(locationService.getRegionById(longParam), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getRegionsByCity")
    public ResponseEntity<List<RegionDto>> getRegionsByCity(CityParam cityParam) {
        return new ResponseEntity<List<RegionDto>>(locationService.getRegionsByCity(cityParam), HttpStatus.OK);
    }

    @Override
    @DeleteMapping("/deleteRegion")
    public ResponseEntity<BaseDto> deleteRegion(RegionParam regionParam) {
        locationService.deleteRegion(regionParam);
        return new ResponseEntity<BaseDto>(BaseDto.builder().id(regionParam.getId()).build(), HttpStatus.OK);
    }

    //place

    @Override
    @PostMapping("/addPlace")
    public ResponseEntity<PlaceDto> addPlace(@RequestBody PlaceParam placeParam) {
        return new ResponseEntity<PlaceDto>(locationService.addPlace(placeParam), HttpStatus.CREATED);
    }

    @Override
    @PutMapping("/updatePlace")
    public ResponseEntity<PlaceDto> updatePlace(@RequestBody PlaceParam placeParam) {
        return new ResponseEntity<PlaceDto>(locationService.updatePlace(placeParam), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getAllPlace")
    public ResponseEntity<List<PlaceDto>> getAllPlace() {
        return new ResponseEntity<List<PlaceDto>>(locationService.getAllPlace(), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getPlaceById")
    public ResponseEntity<PlaceDto> getPlaceById(LongParam longParam) {
        return new ResponseEntity<>(locationService.getPlaceById(longParam), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getPlacesByRegion")
    public ResponseEntity<List<PlaceDto>> getPlacesByRegion(RegionParam regionParam) {
        return new ResponseEntity<List<PlaceDto>>(locationService.getPlacesByRegion(regionParam), HttpStatus.OK);
    }

    @Override
    @DeleteMapping("/deletePlace")
    public ResponseEntity<BaseDto> deletePlace(PlaceParam placeParam) {
        locationService.deletePlace(placeParam);
        return new ResponseEntity<>(BaseDto.builder().id(placeParam.getId()).build(), HttpStatus.OK);
    }

    @Override
    @PostMapping("/addOptionOfPlace")
    public ResponseEntity<OptionOfPlaceDto> addOptionOfPlace(OptionOfPlaceParam optionOfPlaceParam) {
        return new ResponseEntity<OptionOfPlaceDto>(locationService.addOptionOfPlace(optionOfPlaceParam), HttpStatus.CREATED);
    }

    @Override
    @GetMapping("/getPlaceByUser")
    public ResponseEntity<List<PlaceDto>> getPlaceByUser(UserParam userParam) {
        return new ResponseEntity<List<PlaceDto>>(locationService.getPlaceByUser(userParam), HttpStatus.OK);
    }

    @Override
    @PostMapping("/addPlaceOwner")
    public ResponseEntity<PlaceOwnerDto> addPlaceOwner(PlaceOwnerParam placeOwnerParam) {
        return new ResponseEntity<PlaceOwnerDto>(locationService.addPlaceOwner(placeOwnerParam),HttpStatus.CREATED);
    }

    @Override
    @GetMapping("/getOwnersPlace")
    public ResponseEntity<List<UserDto>> getOwnersPlace(PlaceParam placeParam) {
        return new ResponseEntity<List<UserDto>>(locationService.getOwnersPlace(placeParam),HttpStatus.OK);
    }
}
