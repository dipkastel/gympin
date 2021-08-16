package com.notrika.gympin.domain.location;

import com.notrika.gympin.common.location.dto.CityDto;
import com.notrika.gympin.common.location.dto.PlaceDto;
import com.notrika.gympin.common.location.dto.RegionDto;
import com.notrika.gympin.common.location.dto.StateDto;
import com.notrika.gympin.common.location.param.CityParam;
import com.notrika.gympin.common.location.param.PlaceParam;
import com.notrika.gympin.common.location.param.RegionParam;
import com.notrika.gympin.common.location.param.StateParam;
import com.notrika.gympin.common.location.service.LocationService;
import com.notrika.gympin.dao.location.City;
import com.notrika.gympin.dao.location.Place;
import com.notrika.gympin.dao.location.Region;
import com.notrika.gympin.dao.location.State;
import com.notrika.gympin.domain.util.convertor.LocationConvertor;
import com.notrika.gympin.persistence.repository.CityRepository;
import com.notrika.gympin.persistence.repository.PlaceRepository;
import com.notrika.gympin.persistence.repository.RegionRepository;
import com.notrika.gympin.persistence.repository.StateRepository;
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
}
