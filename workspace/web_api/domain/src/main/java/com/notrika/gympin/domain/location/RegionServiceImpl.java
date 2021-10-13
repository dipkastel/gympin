package com.notrika.gympin.domain.location;

import com.notrika.gympin.common.location.dto.RegionDto;
import com.notrika.gympin.common.location.param.CityParam;
import com.notrika.gympin.common.location.param.RegionParam;
import com.notrika.gympin.common.location.service.RegionService;
import com.notrika.gympin.dao.location.City;
import com.notrika.gympin.dao.location.Region;
import com.notrika.gympin.domain.util.convertor.LocationConvertor;
import com.notrika.gympin.persistence.repository.RegionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegionServiceImpl implements RegionService {

    @Autowired
    private RegionRepository regionRepository;

    @Autowired
    private CityServiceImpl cityService;

    @Override
    public RegionDto add(RegionParam regionParam) {
        City city = cityService.getCityById(regionParam.getCity().getId());
        Region initRegion = Region.builder().name(regionParam.getName()).city(city).build();
        Region region = addRegion(initRegion);
        return LocationConvertor.regionToRegionDto(region, LocationConvertor.CollectionType.LIST);
    }

    public Region addRegion(Region region) {
        return regionRepository.add(region);
    }

    @Override
    public RegionDto update(RegionParam regionParam) {
        Region initRegion = getRegionById(regionParam.getId()); //Region.builder().id(regionParam.getId()).name(regionParam.getName()).build();
        initRegion.setName(regionParam.getName());
        if (regionParam.getCity() != null && regionParam.getCity().getId() != null && regionParam.getCity().getId() > 0) {
            City city = cityService.getCityById(regionParam.getId());
            initRegion.setCity(city);
        }
        Region region = updateRegion(initRegion);
        return LocationConvertor.regionToRegionDto(region, LocationConvertor.CollectionType.LIST);
    }

    public Region updateRegion(Region region) {
        return regionRepository.update(region);
    }

    @Override
    public RegionDto delete(RegionParam regionParam) {
        Region region = getRegionById(regionParam.getId());
        return LocationConvertor.regionToRegionDto(region, LocationConvertor.CollectionType.LIST);
    }


    public Region delete(Region region) {
        Region deleteRegion = regionRepository.deleteById2(region);
        return deleteRegion;
    }

    @Override
    public List<RegionDto> getAll() {
        List<Region> regionList = getAllRegion();
        return (List<RegionDto>) LocationConvertor.regionsToRegionDtos(regionList, LocationConvertor.CollectionType.LIST, LocationConvertor.CollectionType.LIST);

    }

    public List<Region> getAllRegion() {
        return regionRepository.findAllUndeleted();
    }

    @Override
    public RegionDto getById(long id) {
        Region region = getRegionById(id);
        return LocationConvertor.regionToRegionDto(region, LocationConvertor.CollectionType.LIST);
    }

    public Region getRegionById(long id) {
        return regionRepository.getById(id);
    }

    @Override
    public List<RegionDto> getRegionsByCity(CityParam cityParam) {
        City city = City.builder().id(cityParam.getId()).build();
        List<Region> regionList = getRegionsByCity(city);
        return (List<RegionDto>) LocationConvertor.regionsToRegionDtos(regionList, LocationConvertor.CollectionType.LIST, LocationConvertor.CollectionType.LIST);
    }

    public List<Region> getRegionsByCity(City city) {
        return regionRepository.getRegionsByCity(city);
    }

}
