package com.notrika.gympin.domain.location;

import com.notrika.gympin.common.location.dto.RegionDto;
import com.notrika.gympin.common.location.param.CityParam;
import com.notrika.gympin.common.location.param.RegionParam;
import com.notrika.gympin.common.location.service.RegionService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.LocationConvertor;
import com.notrika.gympin.persistence.dao.repository.RegionRepository;
import com.notrika.gympin.persistence.entity.location.City;
import com.notrika.gympin.persistence.entity.location.Region;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegionServiceImpl extends AbstractBaseService<RegionParam, RegionDto, Region> implements RegionService {

    @Autowired
    private RegionRepository regionRepository;

    @Autowired
    private CityServiceImpl cityService;

    @Override
    public RegionDto add(RegionParam regionParam) {
        City city = cityService.getEntityById(regionParam.getCity().getId());
        Region initRegion = Region.builder().name(regionParam.getName()).city(city).build();
        Region region = add(initRegion);
        return LocationConvertor.regionToRegionDto(region);
    }

    @Override
    public Region add(Region region) {
        return regionRepository.add(region);
    }

    @Override
    public RegionDto update(RegionParam regionParam) {
        Region initRegion = getEntityById(regionParam.getId()); //Region.builder().id(regionParam.getId()).name(regionParam.getName()).build();
        initRegion.setName(regionParam.getName());
        if (regionParam.getCity() != null && regionParam.getCity().getId() != null && regionParam.getCity().getId() > 0) {
            City city = cityService.getEntityById(regionParam.getId());
            initRegion.setCity(city);
        }
        Region region = update(initRegion);
        return LocationConvertor.regionToRegionDto(region);
    }

    @Override
    public Region update(Region region) {
        return regionRepository.update(region);
    }

    @Override
    public RegionDto delete(RegionParam regionParam) {
        Region region = getEntityById(regionParam.getId());
        return LocationConvertor.regionToRegionDto(region);
    }

    @Override
    public Region delete(Region region) {
        return regionRepository.deleteById2(region);
    }

    @Override
    public List<Region> getAll(Pageable pageable) {
        return regionRepository.findAllUndeleted(pageable);
    }

    @Override
    public List<RegionDto> convertToDtos(List<Region> entities) {
        return LocationConvertor.regionsToRegionDtos(entities);
    }

    @Override
    public RegionDto getById(long id) {
        Region region = getEntityById(id);
        return LocationConvertor.regionToRegionDto(region);
    }

    @Override
    public Region getEntityById(long id) {
        return regionRepository.getById(id);
    }

    @Override
    public List<RegionDto> getRegionsByCity(CityParam cityParam) {
        City city = City.builder().id(cityParam.getId()).build();
        List<Region> regionList = getRegionsByCity(city);
        return LocationConvertor.regionsToRegionDtos(regionList);
    }

    public List<Region> getRegionsByCity(City city) {
        return regionRepository.getRegionsByCity(city);
    }

}
