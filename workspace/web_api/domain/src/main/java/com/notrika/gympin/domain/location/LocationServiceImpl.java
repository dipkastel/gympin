package com.notrika.gympin.domain.location;

import com.notrika.gympin.common.location.dto.*;
import com.notrika.gympin.common.location.param.*;
import com.notrika.gympin.common.location.service.LocationService;
import com.notrika.gympin.common.option.place.dto.PlaceOptionDto;
import com.notrika.gympin.common.option.place.service.PlaceOptionService;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.param.UserParam;
import com.notrika.gympin.dao.location.*;
import com.notrika.gympin.dao.option.place.PlaceOption;
import com.notrika.gympin.dao.user.User;
import com.notrika.gympin.domain.util.convertor.LocationConvertor;
import com.notrika.gympin.persistence.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    @Override
    public StateDto addState(StateParam stateParam) {
        State state = new State();
        state.setName(stateParam.getName());
        return LocationConvertor.stateToStateDto(stateRepository.save(state),
                LocationConvertor.CollectionType.LIST);
    }

    @Override
    public List<StateDto> getAllState() {
        return (List<StateDto>) LocationConvertor.statesToStateDtos(stateRepository.findAll(), LocationConvertor.CollectionType.LIST, LocationConvertor.CollectionType.LIST);
    }

    @Override
    public CityDto addCity(CityParam cityParam) {
        State state = new State();
        state.setId(cityParam.getState().getId());
        City city = new City();
        city.setName(cityParam.getName());
        city.setState(state);
        return LocationConvertor.cityToCityDto(cityRepository.save(city), LocationConvertor.CollectionType.LIST);
    }

    @Override
    public List<CityDto> getAllCity() {
        return (List<CityDto>) LocationConvertor.citiesToCityDtos(cityRepository.findAll(), LocationConvertor.CollectionType.LIST, LocationConvertor.CollectionType.LIST);
    }

    @Override
    public List<CityDto> getCitiesByState(StateParam stateParam) {
        State state = new State();
        state.setId(stateParam.getId());
        List<City> byState = cityRepository.getCitiesByState(state);
        return (List<CityDto>) LocationConvertor.citiesToCityDtos(byState, LocationConvertor.CollectionType.LIST, LocationConvertor.CollectionType.LIST);
    }

    @Override
    public RegionDto addRegion(RegionParam regionParam) {
        City city = new City();
        city.setId(regionParam.getCity().getId());
        Region region = new Region();
        region.setName(regionParam.getName());
        region.setCity(city);
        return LocationConvertor.regionToRegionDto(regionRepository.save(region), LocationConvertor.CollectionType.LIST);
    }

    @Override
    public List<RegionDto> getAllRegion() {
        return (List<RegionDto>) LocationConvertor.regionsToRegionDtos(regionRepository.findAll(), LocationConvertor.CollectionType.LIST, LocationConvertor.CollectionType.LIST);
    }

    @Override
    public List<RegionDto> getRegionsByCity(CityParam cityParam) {
        City city = new City();
        city.setId(cityParam.getId());
        return (List<RegionDto>) LocationConvertor.regionsToRegionDtos(regionRepository.getRegionsByCity(city),
                LocationConvertor.CollectionType.LIST, LocationConvertor.CollectionType.LIST);
    }

    @Override
    public PlaceDto addPlace(PlaceParam placeParam) {
        Region region = new Region();
        region.setId(placeParam.getRegion().getId());
        Place place = new Place();
        place.setName(placeParam.getName());
        place.setLatitude(placeParam.getLatitude());
        place.setLongitude(placeParam.getLongitude());
        place.setRegion(region);
        return LocationConvertor.placeToPlaceDto(placeRepository.save(place), LocationConvertor.CollectionType.LIST);
    }

    @Override
    public List<PlaceDto> getAllPlace() {
        return (List<PlaceDto>) LocationConvertor.placesToPlaceDtos(placeRepository.findAll(), LocationConvertor.CollectionType.LIST, LocationConvertor.CollectionType.LIST);
    }

    @Override
    public List<PlaceDto> getPlacesByRegion(RegionParam regionParam) {
        Region region = new Region();
        region.setId(regionParam.getId());
        return (List<PlaceDto>) LocationConvertor.placesToPlaceDtos(placeRepository.getPlacesByRegion(region), LocationConvertor.CollectionType.LIST,
                LocationConvertor.CollectionType.LIST);
    }

    @Override
    public OptionOfPlaceDto addOptionOfPlace(OptionOfPlaceParam optionOfPlaceParam) {
        if(optionOfPlaceParam.getPlaceOptionParam().getId()==null){
            PlaceOptionDto placeOptionDto = placeOptionService.addPlaceOption(optionOfPlaceParam.getPlaceOptionParam());
            optionOfPlaceParam.getPlaceOptionParam().setId(placeOptionDto.getId());
        }
        OptionOfPlace optionOfPlace = optionOfPlaceRepository.save(OptionOfPlace.builder().place(Place.builder().id(optionOfPlaceParam.getPlaceParam().getId()).build()).placeOption(PlaceOption.builder().id(optionOfPlaceParam.getPlaceOptionParam().getId()).build()).build());
        return OptionOfPlaceDto.builder().id(optionOfPlace.getId()).createdDate(optionOfPlace.getCreatedDate()).updatedDate(optionOfPlace.getUpdatedDate()).isDeleted(optionOfPlace.isDeleted()).place(PlaceDto.builder().id(optionOfPlace.getPlace().getId()).build()).placeOption(PlaceOptionDto.builder().id(optionOfPlace.getPlaceOption().getId()).build()).build();
    }

    @Autowired
    private PlaceOwnerRepository placeOwnerRepository;

    @Override
    public List<PlaceDto> getPlaceByUser(UserParam userParam) {
        List<Place> placeByUser = placeRepository.getPlaceByUser(User.builder().id(userParam.getId()).userRoles(userParam.getRole()).build());
        return (List<PlaceDto>) LocationConvertor.placesToPlaceDtos(placeByUser, LocationConvertor.CollectionType.LIST, LocationConvertor.CollectionType.LIST);
    }
}
