package com.notrika.gympin.domain.location;

import com.notrika.gympin.common.location.dto.PlaceDto;
import com.notrika.gympin.common.location.param.PlaceParam;
import com.notrika.gympin.common.location.param.RegionParam;
import com.notrika.gympin.common.location.service.PlaceService;
import com.notrika.gympin.dao.location.Place;
import com.notrika.gympin.dao.location.Region;
import com.notrika.gympin.dao.user.User;
import com.notrika.gympin.domain.util.convertor.LocationConvertor;
import com.notrika.gympin.persistence.repository.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaceServiceImpl implements PlaceService {

    @Autowired
    private PlaceRepository placeRepository;

    @Autowired
    private RegionServiceImpl regionService;

    @Override
    public PlaceDto add(PlaceParam placeParam) {
        Region region = regionService.getRegionById(placeParam.getRegion().getId());
        Place initPlace = Place.builder().name(placeParam.getName()).latitude(placeParam.getLatitude()).longitude(placeParam.getLongitude()).address(placeParam.getAddress()).region(region).build();
        Place place = addPlace(initPlace);
        return LocationConvertor.placeToPlaceDto(place, LocationConvertor.CollectionType.LIST);
    }

    public Place addPlace(Place place) {
        return placeRepository.add(place);
    }

    @Override
    public PlaceDto update(PlaceParam placeParam) {
        Place initPlace = getPlaceById(placeParam.getId());
        initPlace.setName(placeParam.getName());
        initPlace.setLatitude(placeParam.getLatitude());
        initPlace.setLongitude(placeParam.getLongitude());
        initPlace.setAddress(placeParam.getAddress());
        if (placeParam.getRegion() != null && placeParam.getRegion().getId() != null && placeParam.getRegion().getId() > 0) {
            Region region = regionService.getRegionById(placeParam.getRegion().getId());
            initPlace.setRegion(region);
        }
        Place place = updatePlace(initPlace);
        return LocationConvertor.placeToPlaceDto(place, LocationConvertor.CollectionType.LIST);
    }

    public Place updatePlace(Place place) {
        return placeRepository.update(place);
    }

    @Override
    public void delete(PlaceParam placeParam) {
        var item = getPlaceById(placeParam.getId());
        deletePlace(item);
    }

    public void deletePlace(Place place) {
        placeRepository.deleteById2(place);
    }

    @Override
    public List<PlaceDto> getAll() {
        List<Place> placeList = getAllPlace();
        return (List<PlaceDto>) LocationConvertor.placesToPlaceDtos(placeList, LocationConvertor.CollectionType.LIST, LocationConvertor.CollectionType.LIST);

    }

    public List<Place> getAllPlace() {
        return placeRepository.findAll();
    }

    @Override
    public PlaceDto getById(long id) {
        Place place = getPlaceById(id);
        return LocationConvertor.placeToPlaceDto(place, LocationConvertor.CollectionType.LIST);
    }

    public Place getPlaceById(long id) {
        return placeRepository.getById(id);
    }

    @Override
    public List<PlaceDto> getPlacesByRegion(RegionParam regionParam) {
        Region region = Region.builder().id(regionParam.getId()).build();
        List<Place> placeList = getPlacesByRegion(region);
        return (List<PlaceDto>) LocationConvertor.placesToPlaceDtos(placeList, LocationConvertor.CollectionType.LIST, LocationConvertor.CollectionType.LIST);
    }

    public List<Place> getPlacesByRegion(Region region) {
        return placeRepository.getPlacesByRegion(region);
    }

    public List<Place> getPlaceByUser(User user){
        return placeRepository.getPlaceByUser(user);
    }
}
