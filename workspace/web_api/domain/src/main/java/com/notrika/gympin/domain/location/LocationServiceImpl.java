package com.notrika.gympin.domain.location;

import com.notrika.gympin.common.location.dto.*;
import com.notrika.gympin.common.location.param.*;
import com.notrika.gympin.common.location.service.LocationService;
import com.notrika.gympin.common.option.place.dto.PlaceOptionDto;
import com.notrika.gympin.common.option.place.service.PlaceOptionService;
import com.notrika.gympin.common.primitive.param.LongParam;
import com.notrika.gympin.common.user.param.UserParam;
import com.notrika.gympin.dao.location.*;
import com.notrika.gympin.dao.option.place.PlaceOption;
import com.notrika.gympin.dao.user.User;
import com.notrika.gympin.domain.util.convertor.GeneralConvertor;
import com.notrika.gympin.domain.util.convertor.LocationConvertor;
import com.notrika.gympin.persistence.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationServiceImpl implements LocationService {

    @Autowired
    private StateRepository stateRepository;

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private RegionRepository regionRepository;

    @Autowired
    private PlaceRepository placeRepository;

    @Autowired
    private OptionOfPlaceRepository optionOfPlaceRepository;

    @Autowired
    private PlaceOptionService placeOptionService;

    //state

    @Override
    public StateDto addState(StateParam stateParam) {
        State initState = State.builder().name(stateParam.getName()).build();
        GeneralConvertor.fillBaseFieldsToCreate(stateParam, initState);
        State state = stateRepository.save(initState);
        return LocationConvertor.stateToStateDto(state, LocationConvertor.CollectionType.LIST);
    }
    @Override
    public StateDto updateState(StateParam stateParam) {
        State initState = State.builder().name(stateParam.getName()).build();
        GeneralConvertor.fillBaseFieldsToUpdate(stateParam, initState);
        State state = stateRepository.save(initState);
        return LocationConvertor.stateToStateDto(state, LocationConvertor.CollectionType.LIST);
    }
    @Override
    public List<StateDto> getAllState() {
        List<State> stateList = stateRepository.findAll();
        return (List<StateDto>) LocationConvertor.statesToStateDtos(stateList, LocationConvertor.CollectionType.LIST, LocationConvertor.CollectionType.LIST);
    }

    @Override
    public StateDto getStateById(LongParam longParam) {
        State state = stateRepository.getById(longParam.getValue());
        return LocationConvertor.stateToStateDto(state, LocationConvertor.CollectionType.LIST);
    }

    @Override
    public void deleteState(StateParam stateParam) {
        var item = stateRepository.findById(stateParam.getId()).get();
        stateRepository.deleteById2(item);
    }

    //city

    @Override
    public CityDto addCity(CityParam cityParam) {
        var state = stateRepository.findById(cityParam.getState().getId()).get();
        City initCity = City.builder().name(cityParam.getName()).state(state).build();
        GeneralConvertor.fillBaseFieldsToCreate(cityParam, initCity);
        City city = cityRepository.save(initCity);
        return LocationConvertor.cityToCityDto(city, LocationConvertor.CollectionType.LIST);
    }

    @Override
    public CityDto updateCity(CityParam cityParam) {
        var state = cityRepository.findById(cityParam.getId()).get().getState();
        City initCity = City.builder().name(cityParam.getName()).state(state).build();
        GeneralConvertor.fillBaseFieldsToUpdate(cityParam, initCity);
        City city = cityRepository.save(initCity);
        return LocationConvertor.cityToCityDto(city, LocationConvertor.CollectionType.LIST);
    }

    @Override
    public CityDto getCityById(LongParam longParam) {
        City city = cityRepository.getById(longParam.getValue());
        return LocationConvertor.cityToCityDto(city, LocationConvertor.CollectionType.LIST);
    }

    @Override
    public void deleteCity(CityParam cityParam) {
        var item = cityRepository.findById(cityParam.getId()).get();
        cityRepository.deleteById2(item);
    }

    @Override
    public List<CityDto> getAllCity() {
        List<City> cityList = cityRepository.findAll();
        return (List<CityDto>) LocationConvertor.citiesToCityDtos(cityList, LocationConvertor.CollectionType.LIST, LocationConvertor.CollectionType.LIST);
    }

    @Override
    public List<CityDto> getCitiesByState(StateParam stateParam) {
        State state = State.builder().id(stateParam.getId()).build();
        List<City> cityList = cityRepository.getCitiesByState(state);
        return (List<CityDto>) LocationConvertor.citiesToCityDtos(cityList, LocationConvertor.CollectionType.LIST, LocationConvertor.CollectionType.LIST);
    }

    //region

    @Override
    public RegionDto addRegion(RegionParam regionParam) {
        var city = cityRepository.findById(regionParam.getCity().getId()).get();
        Region initRegion = Region.builder().name(regionParam.getName()).city(city).build();
        GeneralConvertor.fillBaseFieldsToCreate(regionParam, initRegion);
        Region region = regionRepository.save(initRegion);
        return LocationConvertor.regionToRegionDto(region, LocationConvertor.CollectionType.LIST);
    }

    @Override
    public RegionDto updateRegion(RegionParam regionParam) {
        var city = regionRepository.findById(regionParam.getId()).get().getCity();
        Region initRegion = Region.builder().name(regionParam.getName()).city(city).build();
        GeneralConvertor.fillBaseFieldsToUpdate(regionParam, initRegion);
        Region region = regionRepository.save(initRegion);
        return LocationConvertor.regionToRegionDto(region, LocationConvertor.CollectionType.LIST);
    }

    @Override
    public List<RegionDto> getAllRegion() {
        List<Region> regionList = regionRepository.findAll();
        return (List<RegionDto>) LocationConvertor.regionsToRegionDtos(regionList, LocationConvertor.CollectionType.LIST, LocationConvertor.CollectionType.LIST);
    }

    @Override
    public RegionDto getRegionById(LongParam longParam) {
        Region region = regionRepository.getById(longParam.getValue());
        return LocationConvertor.regionToRegionDto(region, LocationConvertor.CollectionType.LIST);
    }

    @Override
    public List<RegionDto> getRegionsByCity(CityParam cityParam) {
        City city = City.builder().id(cityParam.getId()).build();
        List<Region> regionList = regionRepository.getRegionsByCity(city);
        return (List<RegionDto>) LocationConvertor.regionsToRegionDtos(regionList, LocationConvertor.CollectionType.LIST, LocationConvertor.CollectionType.LIST);
    }

    @Override
    public void deleteRegion(RegionParam regionParam) {

        var item = regionRepository.findById(regionParam.getId()).get();
        regionRepository.deleteById2(item);
    }

    //place

    @Override
    public PlaceDto addPlace(PlaceParam placeParam) {
        var region = regionRepository.findById(placeParam.getRegion().getId()).get();
        Place initPlace = Place.builder().name(placeParam.getName()).latitude(placeParam.getLatitude()).longitude(placeParam.getLongitude()).address(placeParam.getAddress()).region(region).build();
        GeneralConvertor.fillBaseFieldsToCreate(placeParam, initPlace);
        Place place = placeRepository.save(initPlace);
        return LocationConvertor.placeToPlaceDto(place, LocationConvertor.CollectionType.LIST);
    }

    @Override
    public PlaceDto updatePlace(PlaceParam placeParam) {
        Place initPlace = Place.builder().name(placeParam.getName()).latitude(placeParam.getLatitude()).longitude(placeParam.getLongitude()).address(placeParam.getAddress()).region(Region.builder().id(placeParam.getRegion().getId()).build()).build();
        GeneralConvertor.fillBaseFieldsToUpdate(placeParam, initPlace);
        Place place = placeRepository.save(initPlace);
        return LocationConvertor.placeToPlaceDto(place, LocationConvertor.CollectionType.LIST);
    }

    @Override
    public List<PlaceDto> getAllPlace() {
        List<Place> placeList = placeRepository.findAll();
        return (List<PlaceDto>) LocationConvertor.placesToPlaceDtos(placeList, LocationConvertor.CollectionType.LIST, LocationConvertor.CollectionType.LIST);
    }

    @Override
    public PlaceDto getPlaceById(LongParam longParam) {
        Place place = placeRepository.getById(longParam.getValue());
        return LocationConvertor.placeToPlaceDto(place, LocationConvertor.CollectionType.LIST);
    }

    @Override
    public List<PlaceDto> getPlacesByRegion(RegionParam regionParam) {
        Region region = Region.builder().id(regionParam.getId()).build();
        List<Place> placeList = placeRepository.getPlacesByRegion(region);
        return (List<PlaceDto>) LocationConvertor.placesToPlaceDtos(placeList, LocationConvertor.CollectionType.LIST, LocationConvertor.CollectionType.LIST);
    }

    @Override
    public void deletePlace(PlaceParam placeParam) {
        var item = placeRepository.findById(placeParam.getId()).get();
        placeRepository.deleteById2(item);
    }

    @Override
    public OptionOfPlaceDto addOptionOfPlace(OptionOfPlaceParam optionOfPlaceParam) {
        if (optionOfPlaceParam.getPlaceOptionParam().getId() == null) {
            PlaceOptionDto placeOptionDto = placeOptionService.addPlaceOption(optionOfPlaceParam.getPlaceOptionParam());
            optionOfPlaceParam.getPlaceOptionParam().setId(placeOptionDto.getId());
        }
        OptionOfPlace optionOfPlace = optionOfPlaceRepository.save(OptionOfPlace.builder().place(Place.builder().id(optionOfPlaceParam.getPlaceParam().getId()).build()).placeOption(PlaceOption.builder().id(optionOfPlaceParam.getPlaceOptionParam().getId()).build()).build());
        return OptionOfPlaceDto.builder().id(optionOfPlace.getId()).createdDate(optionOfPlace.getCreatedDate()).updatedDate(optionOfPlace.getUpdatedDate()).isDeleted(optionOfPlace.isDeleted()).place(PlaceDto.builder().id(optionOfPlace.getPlace().getId()).build()).placeOption(PlaceOptionDto.builder().id(optionOfPlace.getPlaceOption().getId()).build()).build();
    }

    @Override
    public List<PlaceDto> getPlaceByUser(UserParam userParam) {
        User user = User.builder().id(userParam.getId()).userRoles(userParam.getRole()).build();
        List<Place> placeByUser = placeRepository.getPlaceByUser(user);
        return (List<PlaceDto>) LocationConvertor.placesToPlaceDtos(placeByUser, LocationConvertor.CollectionType.LIST, LocationConvertor.CollectionType.LIST);
    }
}
