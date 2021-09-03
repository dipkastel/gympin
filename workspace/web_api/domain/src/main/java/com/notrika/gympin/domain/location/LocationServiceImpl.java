package com.notrika.gympin.domain.location;

import com.notrika.gympin.common.location.dto.*;
import com.notrika.gympin.common.location.param.*;
import com.notrika.gympin.common.location.service.LocationService;
import com.notrika.gympin.common.option.place.dto.PlaceOptionDto;
import com.notrika.gympin.common.option.place.service.PlaceOptionService;
import com.notrika.gympin.common.primitive.param.LongParam;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.param.UserParam;
import com.notrika.gympin.dao.location.*;
import com.notrika.gympin.dao.user.User;
import com.notrika.gympin.domain.util.convertor.LocationConvertor;
import com.notrika.gympin.domain.util.convertor.OptionConvertor;
import com.notrika.gympin.domain.util.convertor.UserConvertor;
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

    @Autowired
    private PlaceOwnerRepository placeOwnerRepository;

    @Autowired
    private UserRepository userRepository;

    //state

    @Override
    public StateDto addState(StateParam stateParam) {
        State initState = State.builder().name(stateParam.getName()).build();
        State state = stateRepository.add(initState);
        return LocationConvertor.stateToStateDto(state, LocationConvertor.CollectionType.LIST);
    }

    @Override
    public StateDto updateState(StateParam stateParam) {
        State initState = stateRepository.getById(stateParam.getId());
        initState.setName(stateParam.getName());
        State state = stateRepository.update(initState);
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
        var item = stateRepository.getById(stateParam.getId());
        stateRepository.deleteById2(item);
    }

    //city

    @Override
    public CityDto addCity(CityParam cityParam) {
        State state = stateRepository.getById(cityParam.getState().getId());
        City initCity = City.builder().name(cityParam.getName()).state(state).build();
        City city = cityRepository.add(initCity);
        return LocationConvertor.cityToCityDto(city, LocationConvertor.CollectionType.LIST);
    }

    @Override
    public CityDto updateCity(CityParam cityParam) {
        City initCity = cityRepository.getById(cityParam.getId());
        initCity.setName(cityParam.getName());
        if (cityParam.getState() != null && cityParam.getState().getId() != null && cityParam.getState().getId() > 0) {
            State state = stateRepository.getById(cityParam.getState().getId());
            initCity.setState(state);
        }
        City city = cityRepository.update(initCity);
        return LocationConvertor.cityToCityDto(city, LocationConvertor.CollectionType.LIST);
    }

    @Override
    public CityDto getCityById(LongParam longParam) {
        City city = cityRepository.getById(longParam.getValue());
        return LocationConvertor.cityToCityDto(city, LocationConvertor.CollectionType.LIST);
    }

    @Override
    public void deleteCity(CityParam cityParam) {
        var item = cityRepository.getById(cityParam.getId());
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
        City city = cityRepository.getById(regionParam.getCity().getId());
        Region initRegion = Region.builder().name(regionParam.getName()).city(city).build();
        Region region = regionRepository.add(initRegion);
        return LocationConvertor.regionToRegionDto(region, LocationConvertor.CollectionType.LIST);
    }

    @Override
    public RegionDto updateRegion(RegionParam regionParam) {
        Region initRegion = regionRepository.getById(regionParam.getId()); //Region.builder().id(regionParam.getId()).name(regionParam.getName()).build();
        initRegion.setName(regionParam.getName());
        if (regionParam.getCity() != null && regionParam.getCity().getId() != null && regionParam.getCity().getId() > 0) {
            City city = cityRepository.getById(regionParam.getId());
            initRegion.setCity(city);
        }
        Region region = regionRepository.update(initRegion);
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
        var item = regionRepository.getById(regionParam.getId());
        regionRepository.deleteById2(item);
    }

    //place

    @Override
    public PlaceDto addPlace(PlaceParam placeParam) {
        Region region = regionRepository.getById(placeParam.getRegion().getId());
        Place initPlace = Place.builder().name(placeParam.getName()).latitude(placeParam.getLatitude()).longitude(placeParam.getLongitude()).address(placeParam.getAddress()).region(region).build();
        Place place = placeRepository.add(initPlace);
        return LocationConvertor.placeToPlaceDto(place, LocationConvertor.CollectionType.LIST);
    }

    @Override
    public PlaceDto updatePlace(PlaceParam placeParam) {
        Place initPlace = placeRepository.getById(placeParam.getId());
        initPlace.setName(placeParam.getName());
        initPlace.setLatitude(placeParam.getLatitude());
        initPlace.setLongitude(placeParam.getLongitude());
        initPlace.setAddress(placeParam.getAddress());
        if (placeParam.getRegion() != null && placeParam.getRegion().getId() != null && placeParam.getRegion().getId() > 0) {
            Region region = regionRepository.getById(placeParam.getRegion().getId());
            initPlace.setRegion(region);
        }
        Place place = placeRepository.update(initPlace);
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
        var item = placeRepository.getById(placeParam.getId());
        placeRepository.deleteById2(item);
    }

    @Override
    public OptionOfPlaceDto addOptionOfPlace(OptionOfPlaceParam optionOfPlaceParam) {
        PlaceOptionDto placeOptionDto;
        if (optionOfPlaceParam.getPlaceOptionParam().getId() == null) {
            placeOptionDto = placeOptionService.addPlaceOption(optionOfPlaceParam.getPlaceOptionParam());
            optionOfPlaceParam.getPlaceOptionParam().setId(placeOptionDto.getId());
        } else {
            placeOptionDto = placeOptionService.getPlaceOptionById(new LongParam(optionOfPlaceParam.getPlaceOptionParam().getId()));
        }
        Place place = placeRepository.getById(optionOfPlaceParam.getPlaceParam().getId());
        OptionOfPlace optionOfPlace = optionOfPlaceRepository.add(OptionOfPlace.builder().place(place).placeOption(OptionConvertor.placeOptionDtoToPlaceOption(placeOptionDto)).build());
        return OptionOfPlaceDto.builder().id(optionOfPlace.getId()).createdDate(optionOfPlace.getCreatedDate()).updatedDate(optionOfPlace.getUpdatedDate()).isDeleted(optionOfPlace.isDeleted()).place(PlaceDto.builder().id(optionOfPlace.getPlace().getId()).build()).placeOption(PlaceOptionDto.builder().id(optionOfPlace.getPlaceOption().getId()).build()).build();
    }

    @Override
    public List<PlaceDto> getPlaceByUser(UserParam userParam) {
        User user = User.builder().id(userParam.getId()).userRoles(userParam.getRole()).build();
        List<Place> placeByUser = placeRepository.getPlaceByUser(user);
        return (List<PlaceDto>) LocationConvertor.placesToPlaceDtos(placeByUser, LocationConvertor.CollectionType.LIST, LocationConvertor.CollectionType.LIST);
    }

    @Override
    public PlaceOwnerDto addPlaceOwner(PlaceOwnerParam placeOwnerParam) {
        Place place = placeRepository.getById(placeOwnerParam.getPlaceParam().getId());
        User user = userRepository.getById(placeOwnerParam.getUserParam().getId());
        PlaceOwner initPlaceOwner = PlaceOwner.builder().place(place).user(user).userRoles(placeOwnerParam.getUserRole()).build();
        PlaceOwner placeOwner = placeOwnerRepository.add(initPlaceOwner);
        return LocationConvertor.placeOwnerToPlaceOwnerDto(placeOwner);
    }

    @Override
    public List<UserDto> getOwnersPlace(PlaceParam placeParam) {
        List<User> ownersPlace = userRepository.getOwnersPlace(Place.builder().id(placeParam.getId()).build());
        return UserConvertor.usersToUserDtos(ownersPlace);
    }
}
