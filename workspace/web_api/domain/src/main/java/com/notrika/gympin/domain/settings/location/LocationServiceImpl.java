package com.notrika.gympin.domain.settings.location;

import com.notrika.gympin.common.settings.location.dto.LocationDto;
import com.notrika.gympin.common.settings.location.param.LocationParam;
import com.notrika.gympin.common.settings.location.query.LocationQuery;
import com.notrika.gympin.common.settings.location.service.LocationService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.LocationConvertor;
import com.notrika.gympin.persistence.dao.repository.settings.ManageLocationRepository;
import com.notrika.gympin.persistence.entity.management.location.ManageLocationEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LocationServiceImpl extends AbstractBaseService<LocationParam, LocationDto, LocationQuery, ManageLocationEntity> implements LocationService {


    @Autowired
    ManageLocationRepository manageLocationRepository;

    @Override
    public LocationDto add(@NonNull LocationParam locationParam) {
        ManageLocationEntity parent = null;
        if (locationParam.getParent() != null)
            parent = manageLocationRepository.getById(locationParam.getParent().getId());
        ManageLocationEntity entity = ManageLocationEntity.builder()
                .name(locationParam.getName())
                .locationType(locationParam.getLocationType())
                .centerLat(locationParam.getCenterLat())
                .centerLng(locationParam.getCenterLng())
                .mapPolygon(locationParam.getMapPolygon())
                .parent(parent)
                .build();
        return LocationConvertor.toDto(manageLocationRepository.add(entity));
    }

    @Override
    public LocationDto update(@NonNull LocationParam locationParam) {
        ManageLocationEntity entity = manageLocationRepository.getById(locationParam.getId());
        entity.setName(locationParam.getName());
        entity.setLocationType(locationParam.getLocationType());
        entity.setCenterLat(locationParam.getCenterLat());
        entity.setCenterLng(locationParam.getCenterLng());
        entity.setMapPolygon(locationParam.getMapPolygon());
        return LocationConvertor.toDto(manageLocationRepository.update(entity));
    }

    @Override
    public LocationDto delete(@NonNull LocationParam locationParam) {
        ManageLocationEntity entity = manageLocationRepository.getById(locationParam.getId());
        return LocationConvertor.toDto(manageLocationRepository.deleteById2(entity));
    }

    @Override
    public LocationDto getById(long id) {
        return LocationConvertor.toDtoWithChilds(manageLocationRepository.getById(id));
    }

    @Override
    public ManageLocationEntity add(ManageLocationEntity entity) {
        return manageLocationRepository.add(entity);
    }

    @Override
    public ManageLocationEntity update(ManageLocationEntity entity) {
        return manageLocationRepository.update(entity);
    }

    @Override
    public ManageLocationEntity delete(ManageLocationEntity entity) {
        return manageLocationRepository.deleteById2(entity);
    }

    @Override
    public ManageLocationEntity getEntityById(long id) {
        return manageLocationRepository.getById(id);
    }

    @Override
    public List<ManageLocationEntity> getAll(Pageable pageable) {
        return manageLocationRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<ManageLocationEntity> findAll(Specification<ManageLocationEntity> specification, Pageable pageable) {
        return manageLocationRepository.findAll(specification,pageable);
    }

    @Override
    public List<LocationDto> convertToDtos(List<ManageLocationEntity> entities) {
        return entities.stream().filter(o->!o.isDeleted()).map(LocationConvertor::toDtoWithChilds).collect(Collectors.toList());
    }

    @Override
    public Page<LocationDto> convertToDtos(Page<ManageLocationEntity> entities) {
        return entities.map(LocationConvertor::toDtoWithChilds);
    }
}
