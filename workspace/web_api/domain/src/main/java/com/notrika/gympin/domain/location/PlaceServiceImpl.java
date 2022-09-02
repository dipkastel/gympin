package com.notrika.gympin.domain.location;

import com.notrika.gympin.common.BaseFilter;
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
public class PlaceServiceImpl extends AbstractBaseService<PlaceParam, PlaceDto, BaseFilter<?>, Place> implements PlaceService {

    @Autowired
    private PlaceRepository placeRepository;

    @Autowired
    private RegionServiceImpl regionService;

    @Override
    public PlaceDto add(PlaceParam placeParam) {
        Region region = regionService.getEntityById(placeParam.getRegion().getId());
        Place initPlace = new Place();
        initPlace.setName(placeParam.getName());
        initPlace.setLatitude(placeParam.getLatitude());
        initPlace.setLatitude(placeParam.getLongitude());
        initPlace.setAddress(placeParam.getAddress());
        initPlace.setRegion(region);
        initPlace.setAboutPlace(placeParam.getAboutPlace());
        initPlace.setPlaceRules(placeParam.getPlaceRules());
        Place place = add(initPlace);
        return LocationConvertor.placeToPlaceDto(place);
    }

    @Override
    public Place add(Place place) {
        return placeRepository.add(place);
    }

    @Override
    public PlaceDto update(PlaceParam placeParam) {
        Place initPlace = getEntityById(placeParam.getId());
        initPlace.setName(placeParam.getName());
        initPlace.setLatitude(placeParam.getLatitude());
        initPlace.setLongitude(placeParam.getLongitude());
        initPlace.setAddress(placeParam.getAddress());
        if (placeParam.getRegion() != null && placeParam.getRegion().getId() != null && placeParam.getRegion().getId() > 0) {
            Region region = regionService.getEntityById(placeParam.getRegion().getId());
            initPlace.setRegion(region);
        }
        Place place = update(initPlace);
        return LocationConvertor.placeToPlaceDto(place);
    }

    @Override
    public Place update(Place place) {
        return placeRepository.update(place);
    }

    @Override
    public PlaceDto delete(PlaceParam placeParam) {
        Place item = getEntityById(placeParam.getId());
        Place deletedPlace = delete(item);
        return LocationConvertor.placeToPlaceDto(deletedPlace);
    }

    @Override
    public Place delete(Place place) {
        return placeRepository.deleteById2(place);
    }

    @Override
    public List<Place> getAll(Pageable pageable) {
        return placeRepository.findAllUndeleted(pageable);
    }

    @Override
    public List<PlaceDto> convertToDtos(List<Place> entities) {
        return LocationConvertor.placesToPlaceDtos(entities);
    }

    @Override
    public PlaceDto getById(long id) {
        Place place = getEntityById(id);
        return LocationConvertor.placeToPlaceDto(place);
    }

    @Override
    public Place getEntityById(long id) {
        return placeRepository.getById(id);
    }

    @Override
    public List<PlaceDto> getPlacesByRegion(RegionParam regionParam) {
        Region region = Region.builder().id(regionParam.getId()).build();
        List<Place> placeList = getPlacesByRegion(region);
        return LocationConvertor.placesToPlaceDtos(placeList);
    }

    public List<Place> getPlacesByRegion(Region region) {
        return placeRepository.findAllByRegionAndDeletedIsFalse(region);
    }

    public List<Place> getPlaceByUser(User user) {
        return placeRepository.findAllByPlaceOwnersAndDeletedIsFalse(user);
    }
}
