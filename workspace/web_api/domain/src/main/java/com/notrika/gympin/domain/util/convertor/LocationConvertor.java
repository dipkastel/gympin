package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.location.dto.CityDto;
import com.notrika.gympin.common.location.dto.PlaceDto;
import com.notrika.gympin.common.location.dto.RegionDto;
import com.notrika.gympin.common.location.dto.StateDto;
import com.notrika.gympin.dao.location.City;
import com.notrika.gympin.dao.location.Place;
import com.notrika.gympin.dao.location.Region;
import com.notrika.gympin.dao.location.State;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.function.Supplier;
import java.util.stream.Collectors;

public class LocationConvertor {

    public static <T> Supplier<Collection<T>> supplierFactory(CollectionType type) {
        switch (type) {
            case LIST:
                return ArrayList<T>::new;
            case SET:
                return HashSet<T>::new;
            default:
                return null;
        }
    }

    public static State stateDtoToState(StateDto stateDto) {
        if (stateDto == null)
            return null;

        State state = new State();
        state.setId(stateDto.getId());
        state.setName(stateDto.getName());
        //state.setCities((Set<City>) cityDtosToCities(stateDto.getCities(), supplierFactory(CollectionType.SET)));
        return state;
    }

    public static Collection<State> stateDtosToStates(Collection<StateDto> stateDtos, CollectionType returnCollectionType) {
        if (stateDtos == null)
            return null;

        return stateDtos.stream().map(LocationConvertor::stateDtoToState).collect(Collectors.toCollection(supplierFactory(returnCollectionType)));
    }

    public static StateDto stateToStateDto(State state, CollectionType collectionType) {
        if (state == null)
            return null;

        StateDto stateDto = new StateDto();
        stateDto.setId(state.getId());
        stateDto.setName(state.getName());
        //stateDto.setCities(citiesToCityDtos(state.getCities(), collectionType,collectionType));
        return stateDto;
    }

    public static Collection<StateDto> statesToStateDtos(Collection<State> states, CollectionType returnCollectionType,
                                                         CollectionType innerCollectionType) {
        if (states == null)
            return null;

        return states.stream().map((x) -> stateToStateDto(x, innerCollectionType)).collect(Collectors.toCollection(supplierFactory(returnCollectionType)));
    }

    public static City cityDtoToCity(CityDto cityDto) {
        if (cityDto == null)
            return null;

        City city = new City();
        city.setId(cityDto.getId());
        city.setName(city.getName());
        city.setState(stateDtoToState(cityDto.getState()));
        //city.setRegions((Set<Region>) regionDtosToRegions(cityDto.getRegions(),CollectionType.SET));
        return city;
    }

    public static Collection<City> cityDtosToCities(Collection<CityDto> cityDtos, Supplier<Collection<City>> supplier) {
        if (cityDtos == null)
            return null;

        return cityDtos.stream().map(LocationConvertor::cityDtoToCity).collect(Collectors.toCollection(supplier));
    }

    public static CityDto cityToCityDto(City city, CollectionType collectionType) {
        if (city == null)
            return null;

        CityDto cityDto = new CityDto();
        cityDto.setId(city.getId());
        cityDto.setName(city.getName());
        cityDto.setState(stateToStateDto(city.getState(), collectionType));
        //cityDto.setRegions(regionsToRegionDtos(city.getRegions(),collectionType,collectionType ));
        return cityDto;
    }

    public static Collection<CityDto> citiesToCityDtos(Collection<City> cityDtos, CollectionType returnCollectionType,
                                                       CollectionType innerCollectionType) {
        if (cityDtos == null)
            return null;

        return cityDtos.stream().map(x -> cityToCityDto(x, innerCollectionType)).collect(Collectors.toCollection(supplierFactory(returnCollectionType)));
    }

    public static Region regionDtoToRegion(RegionDto regionDto) {
        if (regionDto == null)
            return null;

        Region region = new Region();
        region.setId(regionDto.getId());
        region.setName(regionDto.getName());
        region.setCity(cityDtoToCity(regionDto.getCity()));
        //region.setPlaces((Set<Place>) placeDtosToPlaces(regionDto.getPlaces(),CollectionType.SET));
        return region;
    }

    public static Collection<Region> regionDtosToRegions(Collection<RegionDto> regionDtos, CollectionType returnCollectionType) {
        if (regionDtos == null)
            return null;

        return regionDtos.stream().map(LocationConvertor::regionDtoToRegion).collect(Collectors.toCollection(supplierFactory(returnCollectionType)));
    }

    public static RegionDto regionToRegionDto(Region region, CollectionType collectionType) {
        if (region == null)
            return null;

        RegionDto regionDto = new RegionDto();
        regionDto.setId(region.getId());
        regionDto.setName(region.getName());
        regionDto.setCity(cityToCityDto(region.getCity(), collectionType));
        //regionDto.setPlaces(placesToPlaceDtos(region.getPlaces(),collectionType,collectionType ));
        return regionDto;
    }

    public static Collection<RegionDto> regionsToRegionDtos(Collection<Region> states, CollectionType returnCollectionType,
                                                            CollectionType innerCollectionType) {
        if (states == null)
            return null;

        return states.stream().map(x -> regionToRegionDto(x, innerCollectionType)).collect(Collectors.toCollection(supplierFactory(returnCollectionType)));
    }

    public static Place placeDtoToPlace(PlaceDto placeDto) {
        if (placeDto == null)
            return null;

        Place place = new Place();
        place.setId(placeDto.getId());
        place.setName(placeDto.getName());
        place.setLatitude(placeDto.getLatitude());
        place.setLongitude(placeDto.getLongitude());
        place.setAddress(placeDto.getAddress());
        place.setRegion(regionDtoToRegion(placeDto.getRegion()));
        return place;
    }

    public static Collection<Place> placeDtosToPlaces(Collection<PlaceDto> stateDtos, CollectionType returnCollectionType) {
        if (stateDtos == null)
            return null;

        return stateDtos.stream().map(LocationConvertor::placeDtoToPlace).collect(Collectors.toCollection(supplierFactory(returnCollectionType)));
    }

    public static PlaceDto placeToPlaceDto(Place place, CollectionType collectionType) {
        if (place == null)
            return null;

        PlaceDto placeDto = new PlaceDto();
        placeDto.setId(place.getId());
        placeDto.setName(place.getName());
        placeDto.setLatitude(place.getLatitude());
        placeDto.setLongitude(place.getLongitude());
        placeDto.setAddress(place.getAddress());
        placeDto.setRegion(regionToRegionDto(place.getRegion(), collectionType));
        return placeDto;
    }

    public static Collection<PlaceDto> placesToPlaceDtos(Collection<Place> states, CollectionType returnCollectionType,
                                                         CollectionType innerCollectionType) {
        if (states == null)
            return null;

        return states.stream().map((x) -> placeToPlaceDto(x, innerCollectionType)).collect(Collectors.toCollection(supplierFactory(returnCollectionType)));
    }

    public enum CollectionType {
        LIST, SET
    }

}
