package com.notrika.gympin.domain.location;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.location.dto.PlaceDto;
import com.notrika.gympin.common.location.param.PlaceParam;
import com.notrika.gympin.common.location.param.RegionParam;
import com.notrika.gympin.common.location.service.PlaceService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.LocationConvertor;
import com.notrika.gympin.persistence.dao.repository.PlaceRepository;
import com.notrika.gympin.persistence.entity.location.PlaceEntity;
import com.notrika.gympin.persistence.entity.location.RegionEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaceServiceImpl extends AbstractBaseService<PlaceParam, PlaceDto, BaseFilter<?>, PlaceEntity> implements PlaceService {

    @Autowired
    private PlaceRepository placeRepository;

    @Autowired
    private RegionServiceImpl regionService;

    @Override
    public PlaceDto add(PlaceParam placeParam) {
        RegionEntity region = regionService.getEntityById(placeParam.getRegion().getId());
        PlaceEntity initPlace = new PlaceEntity();
        initPlace.setName(placeParam.getName());
        initPlace.setLatitude(placeParam.getLatitude());
        initPlace.setLatitude(placeParam.getLongitude());
        initPlace.setAddress(placeParam.getAddress());
        initPlace.setRegion(region);
        initPlace.setAboutPlace(placeParam.getAboutPlace());
        initPlace.setPlaceRules(placeParam.getPlaceRules());
        PlaceEntity place = add(initPlace);
        return LocationConvertor.placeToPlaceDto(place);
    }

    @Override
    public PlaceEntity add(PlaceEntity place) {
        return placeRepository.add(place);
    }

    @Override
    public PlaceDto update(PlaceParam placeParam) {
        PlaceEntity initPlace = getEntityById(placeParam.getId());
        initPlace.setName(placeParam.getName());
        initPlace.setLatitude(placeParam.getLatitude());
        initPlace.setLongitude(placeParam.getLongitude());
        initPlace.setAddress(placeParam.getAddress());
        if (placeParam.getRegion() != null && placeParam.getRegion().getId() != null && placeParam.getRegion().getId() > 0) {
            RegionEntity region = regionService.getEntityById(placeParam.getRegion().getId());
            initPlace.setRegion(region);
        }
        PlaceEntity place = update(initPlace);
        return LocationConvertor.placeToPlaceDto(place);
    }

    @Override
    public PlaceEntity update(PlaceEntity place) {
        return placeRepository.update(place);
    }

    @Override
    public PlaceDto delete(PlaceParam placeParam) {
        PlaceEntity item = getEntityById(placeParam.getId());
        PlaceEntity deletedPlace = delete(item);
        return LocationConvertor.placeToPlaceDto(deletedPlace);
    }

    @Override
    public PlaceEntity delete(PlaceEntity place) {
        return placeRepository.deleteById2(place);
    }

    @Override
    public List<PlaceEntity> getAll(Pageable pageable) {
        return placeRepository.findAllUndeleted(pageable);
    }

    @Override
    public List<PlaceDto> convertToDtos(List<PlaceEntity> entities) {
        return LocationConvertor.placesToPlaceDtos(entities);
    }

    @Override
    public PlaceDto getById(long id) {
        PlaceEntity place = getEntityById(id);
        return LocationConvertor.placeToPlaceDto(place);
    }

    @Override
    public PlaceEntity getEntityById(long id) {
        return placeRepository.getById(id);
    }

    @Override
    public List<PlaceDto> getPlacesByRegion(RegionParam regionParam) {
        RegionEntity region = RegionEntity.builder().id(regionParam.getId()).build();
        List<PlaceEntity> placeList = getPlacesByRegion(region);
        return LocationConvertor.placesToPlaceDtos(placeList);
    }

    public List<PlaceEntity> getPlacesByRegion(RegionEntity region) {
        return placeRepository.findAllByRegionAndDeletedIsFalse(region);
    }

    public List<PlaceEntity> getPlaceByUser(UserEntity user) {
        return placeRepository.findAllByPlaceOwnersAndDeletedIsFalse(user);
    }
}
