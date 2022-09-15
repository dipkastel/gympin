package com.notrika.gympin.domain.location;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.exception.general.InputNotValidException;
import com.notrika.gympin.common.location.dto.CityDto;
import com.notrika.gympin.common.location.param.CityParam;
import com.notrika.gympin.common.location.param.StateParam;
import com.notrika.gympin.common.location.service.CityService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.LocationConvertor;
import com.notrika.gympin.persistence.dao.repository.CityRepository;
import com.notrika.gympin.persistence.entity.location.CityEntity;
import com.notrika.gympin.persistence.entity.location.StateEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityServiceImpl extends AbstractBaseService<CityParam, CityDto, BaseFilter<?>, CityEntity> implements CityService {

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private StateServiceImpl stateService;

    @Override
    @CacheEvict("city")
    public CityDto add(CityParam cityParam) {
        StateEntity state = stateService.getEntityById(cityParam.getState().getId());
        CityEntity initCity = CityEntity.builder().name(cityParam.getName()).state(state).build();
        CityEntity city = add(initCity);
        return LocationConvertor.cityToCityDto(city);
    }

    @Override
    @CacheEvict("city")
    public CityEntity add(CityEntity city) {
        return cityRepository.add(city);
    }

    @Override
    @CacheEvict("city")
    public CityDto update(CityParam cityParam) {
        CityEntity initCity = getEntityById(cityParam.getId());
        initCity.setName(cityParam.getName());
        if (cityParam.getState() == null || cityParam.getState().getId() == null || cityParam.getState().getId() <= 0) throw new InputNotValidException();
        if (cityParam.getState() != null && cityParam.getState().getId() != null && cityParam.getState().getId() > 0) {
            StateEntity state = stateService.getEntityById(cityParam.getState().getId());
            initCity.setState(state);
        }
        CityEntity city = update(initCity);
        return LocationConvertor.cityToCityDto(city);
    }

    @Override
    @CacheEvict("city")
    public CityEntity update(CityEntity city) {
        return cityRepository.update(city);
    }

    @Override
    @CacheEvict("city")
    public CityDto delete(CityParam cityParam) {
        CityEntity item = getEntityById(cityParam.getId());
        CityEntity deletedCity = delete(item);
        return LocationConvertor.cityToCityDto(deletedCity);
    }

    @Override
    @CacheEvict("city")
    public CityEntity delete(CityEntity city) {
        return cityRepository.deleteById2(city);
    }

    @Override
    public List<CityEntity> getAll(Pageable pageable) {
        return cityRepository.findAllUndeleted(pageable);
    }

    @Override
    public List<CityDto> convertToDtos(List<CityEntity> entities) {
        return LocationConvertor.citiesToCityDtos(entities);
    }

    @Override
    public CityDto getById(long id) {
        CityEntity city = getEntityById(id);
        return LocationConvertor.cityToCityDto(city);
    }

    @Override
    public CityEntity getEntityById(long id) {
        return cityRepository.getById(id);
    }

    @Override
    public List<CityDto> getCitiesByState(StateParam stateParam) {
        StateEntity state = StateEntity.builder().id(stateParam.getId()).build();
        List<CityEntity> cityList = getCitiesByState(state);
        return LocationConvertor.citiesToCityDtos(cityList);
    }

    public List<CityEntity> getCitiesByState(StateEntity state) {
        return cityRepository.findAllByStateAndDeletedIsFalse(state);
    }

    private void validateCityParam(CityParam param) {

    }


}
