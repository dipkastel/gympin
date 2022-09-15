package com.notrika.gympin.domain.location;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.location.dto.RegionDto;
import com.notrika.gympin.common.location.param.CityParam;
import com.notrika.gympin.common.location.param.RegionParam;
import com.notrika.gympin.common.location.service.RegionService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.LocationConvertor;
import com.notrika.gympin.persistence.dao.repository.RegionRepository;
import com.notrika.gympin.persistence.entity.location.CityEntity;
import com.notrika.gympin.persistence.entity.location.RegionEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegionServiceImpl extends AbstractBaseService<RegionParam, RegionDto, BaseFilter<?>, RegionEntity> implements RegionService {

    @Autowired
    private RegionRepository regionRepository;

    @Autowired
    private CityServiceImpl cityService;

    @Override
    public RegionDto add(RegionParam regionParam) {
        CityEntity city = cityService.getEntityById(regionParam.getCity().getId());
        RegionEntity initRegion = RegionEntity.builder().name(regionParam.getName()).city(city).build();
        RegionEntity region = add(initRegion);
        return LocationConvertor.regionToRegionDto(region);
    }

    @Override
    public RegionEntity add(RegionEntity region) {
        return regionRepository.add(region);
    }

    @Override
    public RegionDto update(RegionParam regionParam) {
        RegionEntity initRegion = getEntityById(regionParam.getId()); //Region.builder().id(regionParam.getId()).name(regionParam.getName()).build();
        initRegion.setName(regionParam.getName());
        if (regionParam.getCity() != null && regionParam.getCity().getId() != null && regionParam.getCity().getId() > 0) {
            CityEntity city = cityService.getEntityById(regionParam.getId());
            initRegion.setCity(city);
        }
        RegionEntity region = update(initRegion);
        return LocationConvertor.regionToRegionDto(region);
    }

    @Override
    public RegionEntity update(RegionEntity region) {
        return regionRepository.update(region);
    }

    @Override
    public RegionDto delete(RegionParam regionParam) {
        RegionEntity region = getEntityById(regionParam.getId());
        return LocationConvertor.regionToRegionDto(delete(region));
    }

    @Override
    public RegionEntity delete(RegionEntity region) {
        return regionRepository.deleteById2(region);
    }

    @Override
    public List<RegionEntity> getAll(Pageable pageable) {
        return regionRepository.findAllUndeleted(pageable);
    }

    @Override
    public List<RegionDto> convertToDtos(List<RegionEntity> entities) {
        return LocationConvertor.regionsToRegionDtos(entities);
    }

    @Override
    public RegionDto getById(long id) {
        RegionEntity region = getEntityById(id);
        return LocationConvertor.regionToRegionDto(region);
    }

    @Override
    public RegionEntity getEntityById(long id) {
        return regionRepository.getById(id);
    }

    @Override
    public List<RegionDto> getRegionsByCity(CityParam cityParam) {
        CityEntity city = CityEntity.builder().id(cityParam.getId()).build();
        List<RegionEntity> regionList = getRegionsByCity(city);
        return LocationConvertor.regionsToRegionDtos(regionList);
    }

    public List<RegionEntity> getRegionsByCity(CityEntity city) {
        return regionRepository.findAllByCityAndDeletedIsFalse(city);
    }

}
