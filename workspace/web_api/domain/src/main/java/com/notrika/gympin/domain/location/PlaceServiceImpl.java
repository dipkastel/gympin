package com.notrika.gympin.domain.location;

import com.notrika.gympin.common.location.dto.PlaceDto;
import com.notrika.gympin.common.location.param.PlaceParam;
import com.notrika.gympin.common.location.param.RegionParam;
import com.notrika.gympin.common.location.service.PlaceService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.LocationConvertor;
import com.notrika.gympin.persistence.dao.repository.PlaceRepository;
import com.notrika.gympin.persistence.entity.location.Place;
import com.notrika.gympin.persistence.entity.location.Region;
import com.notrika.gympin.persistence.entity.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaceServiceImpl extends AbstractBaseService<PlaceParam, PlaceDto,Place> implements PlaceService {

    @Autowired
    private PlaceRepository placeRepository;

    @Autowired
    private RegionServiceImpl regionService;

    @Override
    public PlaceDto add(PlaceParam placeParam) {
        Region region = regionService.getRegionById(placeParam.getRegion().getId());
        Place initPlace =
                Place.builder().name(placeParam.getName()).latitude(placeParam.getLatitude()).longitude(placeParam.getLongitude()).address(placeParam.getAddress()).region(region).build();
        Place place = addPlace(initPlace);
        return LocationConvertor.placeToPlaceDto(place);
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
        return LocationConvertor.placeToPlaceDto(place);
    }

    public Place updatePlace(Place place) {
        return placeRepository.update(place);
    }

    @Override
    public PlaceDto delete(PlaceParam placeParam) {
        var item = getPlaceById(placeParam.getId());
        Place deletedPlace = deletePlace(item);
        return LocationConvertor.placeToPlaceDto(deletedPlace);
    }

    public Place deletePlace(Place place) {
        return placeRepository.deleteById2(place);
    }

    @Override
    public List<Place> getAll(Pageable pageable) {
        return placeRepository.findAllUndeleted(pageable);
    }

    @Override
    public List<PlaceDto> convertToDto(List<Place> entities) {
        return LocationConvertor.placesToPlaceDtos(entities);
    }

    @Override
    public PlaceDto getById(long id) {
        Place place = getPlaceById(id);
        return LocationConvertor.placeToPlaceDto(place);
    }

    public Place getPlaceById(long id) {
        return placeRepository.getById(id);
    }

    @Override
    public List<PlaceDto> getPlacesByRegion(RegionParam regionParam) {
        Region region = Region.builder().id(regionParam.getId()).build();
        List<Place> placeList = getPlacesByRegion(region);
        return LocationConvertor.placesToPlaceDtos(placeList);
    }

    public List<Place> getPlacesByRegion(Region region) {
        return placeRepository.getPlacesByRegion(region);
    }

    public List<Place> getPlaceByUser(User user) {
        return placeRepository.getPlaceByUser(user);
    }
}
