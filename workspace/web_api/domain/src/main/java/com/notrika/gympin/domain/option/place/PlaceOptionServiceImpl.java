package com.notrika.gympin.domain.option.place;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.option.place.dto.PlaceOptionDto;
import com.notrika.gympin.common.option.place.param.PlaceOptionParam;
import com.notrika.gympin.common.option.place.service.PlaceOptionService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.OptionConvertor;
import com.notrika.gympin.persistence.dao.repository.PlaceOptionRepository;
import com.notrika.gympin.persistence.entity.option.place.PlaceOptionEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaceOptionServiceImpl extends AbstractBaseService<PlaceOptionParam, PlaceOptionDto, BaseFilter<?>, PlaceOptionEntity> implements PlaceOptionService {

    @Autowired
    private PlaceOptionRepository placeOptionRepository;

    @Override
    public PlaceOptionDto add(PlaceOptionParam placeOptionParam) {
        PlaceOptionEntity initPlaceOption = PlaceOptionEntity.builder().name(placeOptionParam.getName()).build();
        PlaceOptionEntity placeOption = add(initPlaceOption);
        return OptionConvertor.placeOptionToPlaceOptionDto(placeOption);
    }

    @Override
    public PlaceOptionEntity add(PlaceOptionEntity placeOption) {
        return placeOptionRepository.add(placeOption);
    }

    @Override
    public PlaceOptionDto update(PlaceOptionParam placeOptionParam) {
        PlaceOptionEntity initPlaceOption = getEntityById(placeOptionParam.getId());
        initPlaceOption.setName(placeOptionParam.getName());
        PlaceOptionEntity placeOption = update(initPlaceOption);
        return OptionConvertor.placeOptionToPlaceOptionDto(placeOption);
    }

    @Override
    public PlaceOptionEntity update(PlaceOptionEntity placeOption) {
        return placeOptionRepository.update(placeOption);
    }

    @Override
    public List<PlaceOptionEntity> getAll(Pageable pageable) {
        return placeOptionRepository.findAllUndeleted(pageable);
    }

    @Override
    public List<PlaceOptionDto> convertToDtos(List<PlaceOptionEntity> entities) {
        return OptionConvertor.placeOptionsToPlaceOptionDtos(entities);
    }

    @Override
    public PlaceOptionDto getById(long id) {
        PlaceOptionEntity placeOption = getEntityById(id);
        return OptionConvertor.placeOptionToPlaceOptionDto(placeOption);
    }

    @Override
    public PlaceOptionEntity getEntityById(long id) {
        return placeOptionRepository.getById(id);
    }

    @Override
    public PlaceOptionDto delete(PlaceOptionParam placeOptionParam) {
        PlaceOptionEntity placeOption = getEntityById(placeOptionParam.getId());
        PlaceOptionEntity deletedPlaceOption = delete(placeOption);
        return OptionConvertor.placeOptionToPlaceOptionDto(deletedPlaceOption);
    }

    @Override
    public PlaceOptionEntity delete(PlaceOptionEntity placeOption) {
        return placeOptionRepository.deleteById2(placeOption);
    }
}
