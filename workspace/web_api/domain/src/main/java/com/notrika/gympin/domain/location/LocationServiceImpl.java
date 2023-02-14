package com.notrika.gympin.domain.location;

import com.notrika.gympin.common.location.dto.LocationDto;
import com.notrika.gympin.common.location.param.LocationParam;
import com.notrika.gympin.common.location.query.LocationQuery;
import com.notrika.gympin.common.location.service.LocationService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.LocationConvertor;
import com.notrika.gympin.persistence.dao.repository.LocationRepository;
import com.notrika.gympin.persistence.entity.location.LocationEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LocationServiceImpl extends AbstractBaseService<LocationParam, LocationDto, LocationQuery, LocationEntity> implements LocationService {


    @Autowired
    LocationRepository locationRepository;

    @Override
    public LocationDto add(@NonNull LocationParam locationParam) {
        LocationEntity parent = null;
        if (locationParam.getParent() != null)
            parent = locationRepository.getById(locationParam.getParent().getId());
        LocationEntity entity = LocationEntity.builder()
                .name(locationParam.getName())
                .locationType(locationParam.getLocationType())
                .centerLat(locationParam.getCenterLat())
                .centerLng(locationParam.getCenterLng())
                .mapPolygon(locationParam.getMapPolygon())
                .parent(parent)
                .build();
        return LocationConvertor.toDto(locationRepository.add(entity));
    }

    @Override
    public LocationDto update(@NonNull LocationParam locationParam) {
        LocationEntity entity = locationRepository.getById(locationParam.getId());
        entity.setName(entity.getName());
        entity.setLocationType(entity.getLocationType());
        entity.setCenterLat(entity.getCenterLat());
        entity.setCenterLng(entity.getCenterLng());
        entity.setMapPolygon(entity.getMapPolygon());
        return LocationConvertor.toDto(locationRepository.update(entity));
    }

    @Override
    public LocationDto delete(@NonNull LocationParam locationParam) {
        LocationEntity entity =locationRepository.getById(locationParam.getId());
        return LocationConvertor.toDto(locationRepository.deleteById2(entity));
    }

    @Override
    public LocationDto getById(long id) {
        return LocationConvertor.toDtoWithChilds(locationRepository.getById(id));
    }

    @Override
    public LocationEntity add(LocationEntity entity) {
        return locationRepository.add(entity);
    }

    @Override
    public LocationEntity update(LocationEntity entity) {
        return locationRepository.update(entity);
    }

    @Override
    public LocationEntity delete(LocationEntity entity) {
        return locationRepository.deleteById2(entity);
    }

    @Override
    public LocationEntity getEntityById(long id) {
        return locationRepository.getById(id);
    }

    @Override
    public List<LocationEntity> getAll(Pageable pageable) {
        return locationRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<LocationEntity> findAll(Specification<LocationEntity> specification, Pageable pageable) {
        return locationRepository.findAll(specification,pageable);
    }

    @Override
    public List<LocationDto> convertToDtos(List<LocationEntity> entities) {
        return entities.stream().map(LocationConvertor::toDtoWithChilds).collect(Collectors.toList());
    }

    @Override
    public Page<LocationDto> convertToDtos(Page<LocationEntity> entities) {
        return entities.map(LocationConvertor::toDtoWithChilds);
    }
}
