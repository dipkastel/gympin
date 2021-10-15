package com.notrika.gympin.domain.location;

import com.notrika.gympin.common.location.dto.CityDto;
import com.notrika.gympin.common.location.param.CityParam;
import com.notrika.gympin.common.location.param.StateParam;
import com.notrika.gympin.common.location.service.CityService;
import com.notrika.gympin.domain.util.convertor.LocationConvertor;
import com.notrika.gympin.persistence.dao.repository.CityRepository;
import com.notrika.gympin.persistence.entity.location.City;
import com.notrika.gympin.persistence.entity.location.State;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityServiceImpl implements CityService {

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private StateServiceImpl stateService;

    @Override
    public CityDto add(CityParam cityParam) {
        State state = stateService.getStateById(cityParam.getState().getId());
        City initCity = City.builder().name(cityParam.getName()).state(state).build();
        City city = addCity(initCity);
        return LocationConvertor.cityToCityDto(city, LocationConvertor.CollectionType.LIST);
    }

    public City addCity(City city) {
        return cityRepository.add(city);
    }

    @Override
    public CityDto update(CityParam cityParam) {
        City initCity = getCityById(cityParam.getId());
        initCity.setName(cityParam.getName());
        if (cityParam.getState() != null && cityParam.getState().getId() != null && cityParam.getState().getId() > 0) {
            State state = stateService.getStateById(cityParam.getState().getId());
            initCity.setState(state);
        }
        City city = updateCity(initCity);
        return LocationConvertor.cityToCityDto(city, LocationConvertor.CollectionType.LIST);
    }

    public City updateCity(City city) {
        return cityRepository.update(city);
    }

    @Override
    public CityDto delete(CityParam cityParam) {
        var item = getCityById(cityParam.getId());
        City deletedCity = deleteCity(item);
        return LocationConvertor.cityToCityDto(deletedCity, LocationConvertor.CollectionType.LIST);
    }

    public City deleteCity(City city) {
        return cityRepository.deleteById2(city);
    }

    @Override
    public List<CityDto> getAll() {
        List<City> cityList = getAllCity();
        return (List<CityDto>) LocationConvertor.citiesToCityDtos(cityList, LocationConvertor.CollectionType.LIST, LocationConvertor.CollectionType.LIST);

    }

    public List<City> getAllCity() {
        return cityRepository.findAllUndeleted();
    }

    @Override
    public CityDto getById(long id) {
        City city = getCityById(id);
        return LocationConvertor.cityToCityDto(city, LocationConvertor.CollectionType.LIST);
    }

    public City getCityById(long id) {
        return cityRepository.getById(id);
    }

    @Override
    public List<CityDto> getCitiesByState(StateParam stateParam) {
        State state = State.builder().id(stateParam.getId()).build();
        List<City> cityList = getCitiesByState(state);
        return (List<CityDto>) LocationConvertor.citiesToCityDtos(cityList, LocationConvertor.CollectionType.LIST, LocationConvertor.CollectionType.LIST);
    }

    public List<City> getCitiesByState(State state) {
        return cityRepository.getCitiesByState(state);
    }
}
