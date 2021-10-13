package com.notrika.gympin.controller.impl.location;

import com.notrika.gympin.common.BaseDto;
import com.notrika.gympin.common.location.api.LocationController;
import com.notrika.gympin.common.location.dto.*;
import com.notrika.gympin.common.location.param.*;
import com.notrika.gympin.common.location.service.*;
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

    @Autowired
    private StateService stateService;

    @Autowired
    private CityService cityService;

    @Autowired
    private RegionService regionService;

    @Autowired
    private PlaceService placeService;

    //state

    @Override
    //@RolesAllowed({"ADMIN"})
    @PostMapping("/addState")
    public ResponseEntity<StateDto> addState(@RequestBody StateParam stateParam) {
        return new ResponseEntity<StateDto>(stateService.add(stateParam), HttpStatus.OK);
    }

    @Override
    //@RolesAllowed({"ADMIN"})
    @PutMapping("/updateState")
    public ResponseEntity<StateDto> updateState(@RequestBody StateParam stateParam) {
        return new ResponseEntity<StateDto>(stateService.update(stateParam), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getAllState")
    public ResponseEntity<List<StateDto>> getAllState() {
        return new ResponseEntity<List<StateDto>>(stateService.getAll(), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getStateById")
    public ResponseEntity<StateDto> getStateById(long id) {
        return new ResponseEntity<StateDto>(stateService.getById(id), HttpStatus.OK);
    }

    @Override
    //@RolesAllowed({"ADMIN"})
    @DeleteMapping("/deleteState")
    public ResponseEntity<StateDto> deleteState(StateParam stateParam) {
        StateDto deletedState = stateService.delete(stateParam);
        return new ResponseEntity<StateDto>(deletedState, HttpStatus.OK);
    }

    //city

    @Override
    @PostMapping("/addCity")
    public ResponseEntity<CityDto> addCity(@RequestBody CityParam cityParam) {
        return new ResponseEntity<CityDto>(cityService.add(cityParam), HttpStatus.OK);
    }

    @Override
    @PutMapping("/updateCity")
    public ResponseEntity<CityDto> updateCity(@RequestBody CityParam cityParam) {
        return new ResponseEntity<CityDto>(cityService.update(cityParam), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getCityById")
    public ResponseEntity<CityDto> getCityById(long id) {
        return new ResponseEntity<CityDto>(cityService.getById(id), HttpStatus.OK);
    }

    @Override
    @DeleteMapping("/deleteCity")
    public ResponseEntity<CityDto> deleteCity(CityParam cityParam) {
        CityDto deletedCity = cityService.delete(cityParam);
        return new ResponseEntity<CityDto>(deletedCity, HttpStatus.OK);
    }

    @Override
    @GetMapping("/getAllCity")
    public ResponseEntity<List<CityDto>> getAllCity() {
        return new ResponseEntity<List<CityDto>>(cityService.getAll(), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getCitiesByState")
    public ResponseEntity<List<CityDto>> getCitiesByState(StateParam stateParam) {
        return new ResponseEntity<List<CityDto>>(cityService.getCitiesByState(stateParam), HttpStatus.OK);
    }

    //region

    @Override
    @PostMapping("/addRegion")
    public ResponseEntity<RegionDto> addRegion(@RequestBody RegionParam regionParam) {
        return new ResponseEntity<RegionDto>(regionService.add(regionParam), HttpStatus.OK);
    }

    @Override
    @PutMapping("/updateRegion")
    public ResponseEntity<RegionDto> updateRegion(@RequestBody RegionParam regionParam) {
        return new ResponseEntity<RegionDto>(regionService.update(regionParam), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getAllRegion")
    public ResponseEntity<List<RegionDto>> getAllRegion() {
        return new ResponseEntity<List<RegionDto>>(regionService.getAll(), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getRegionById")
    public ResponseEntity<RegionDto> getRegionById(long id) {
        return new ResponseEntity<RegionDto>(regionService.getById(id), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getRegionsByCity")
    public ResponseEntity<List<RegionDto>> getRegionsByCity(CityParam cityParam) {
        return new ResponseEntity<List<RegionDto>>(regionService.getRegionsByCity(cityParam), HttpStatus.OK);
    }

    @Override
    @DeleteMapping("/deleteRegion")
    public ResponseEntity<RegionDto> deleteRegion(RegionParam regionParam) {
        RegionDto deletedRegion = regionService.delete(regionParam);
        return new ResponseEntity<RegionDto>(deletedRegion, HttpStatus.OK);
    }

    //place

    @Override
    @PostMapping("/addPlace")
    public ResponseEntity<PlaceDto> addPlace(@RequestBody PlaceParam placeParam) {
        return new ResponseEntity<PlaceDto>(placeService.add(placeParam), HttpStatus.OK);
    }

    @Override
    @PutMapping("/updatePlace")
    public ResponseEntity<PlaceDto> updatePlace(@RequestBody PlaceParam placeParam) {
        return new ResponseEntity<PlaceDto>(placeService.update(placeParam), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getAllPlace")
    public ResponseEntity<List<PlaceDto>> getAllPlace() {
        return new ResponseEntity<List<PlaceDto>>(placeService.getAll(), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getPlaceById")
    public ResponseEntity<PlaceDto> getPlaceById(long id) {
        return new ResponseEntity<>(placeService.getById(id), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getPlacesByRegion")
    public ResponseEntity<List<PlaceDto>> getPlacesByRegion(RegionParam regionParam) {
        return new ResponseEntity<List<PlaceDto>>(placeService.getPlacesByRegion(regionParam), HttpStatus.OK);
    }

    @Override
    @DeleteMapping("/deletePlace")
    public ResponseEntity<PlaceDto> deletePlace(PlaceParam placeParam) {
        PlaceDto deletedPlace = placeService.delete(placeParam);
        return new ResponseEntity<PlaceDto>(deletedPlace, HttpStatus.OK);
    }

    @Override
    @PostMapping("/addOptionOfPlace")
    public ResponseEntity<OptionOfPlaceDto> addOptionOfPlace(@RequestBody OptionOfPlaceParam optionOfPlaceParam) {
        return new ResponseEntity<OptionOfPlaceDto>(locationService.addOptionOfPlace(optionOfPlaceParam), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getPlaceByUser")
    public ResponseEntity<List<PlaceDto>> getPlaceByUser(UserParam userParam) {
        return new ResponseEntity<List<PlaceDto>>(locationService.getPlaceByUser(userParam), HttpStatus.OK);
    }

    @Override
    @PostMapping("/addPlaceOwner")
    public ResponseEntity<PlaceOwnerDto> addPlaceOwner(@RequestBody PlaceOwnerParam placeOwnerParam) {
        return new ResponseEntity<PlaceOwnerDto>(locationService.addPlaceOwner(placeOwnerParam), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getOwnersPlace")
    public ResponseEntity<List<UserDto>> getOwnersPlace(PlaceParam placeParam) {
        return new ResponseEntity<List<UserDto>>(locationService.getOwnersPlace(placeParam), HttpStatus.OK);
    }

    @Override
    @DeleteMapping("/deletePlaceOwner")
    public ResponseEntity<PlaceOwnerDto> deletePlaceOwner(PlaceOwnerParam placeOwnerParam) {
        PlaceOwnerDto deletedPlaceOwner = locationService.deletePlaceOwner(placeOwnerParam);
        return new ResponseEntity<PlaceOwnerDto>(deletedPlaceOwner,HttpStatus.OK);
    }
}
