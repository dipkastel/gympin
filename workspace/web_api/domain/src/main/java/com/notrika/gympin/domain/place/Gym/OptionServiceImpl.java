package com.notrika.gympin.domain.place.Gym;

import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.place.parts.option.dto.PlaceOptionDto;
import com.notrika.gympin.common.place.parts.option.param.PlaceOptionParam;
import com.notrika.gympin.common.place.parts.option.service.OptionService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.OptionConvertor;
import com.notrika.gympin.persistence.dao.repository.place.Gym.OptionRepository;
import com.notrika.gympin.persistence.entity.place.Gym.OptionEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OptionServiceImpl extends AbstractBaseService<PlaceOptionParam, PlaceOptionDto, BaseQuery<?>, OptionEntity> implements OptionService {

    @Autowired
    private OptionRepository optionRepository;

    @Override
    public PlaceOptionDto add(PlaceOptionParam placeOptionParam) {
        OptionEntity initPlaceOption = OptionEntity.builder().name(placeOptionParam.getName()).weight(placeOptionParam.getWeight()).build();
        OptionEntity placeOption = add(initPlaceOption);
        return OptionConvertor.placeOptionToPlaceOptionDto(placeOption);
    }

    @Override
    public OptionEntity add(OptionEntity placeOption) {
        return optionRepository.add(placeOption);
    }

    @Override
    public PlaceOptionDto update(PlaceOptionParam placeOptionParam) {
        OptionEntity initPlaceOption = getEntityById(placeOptionParam.getId());
        initPlaceOption.setName(placeOptionParam.getName());
        initPlaceOption.setWeight(placeOptionParam.getWeight());
        OptionEntity placeOption = update(initPlaceOption);
        return OptionConvertor.placeOptionToPlaceOptionDto(placeOption);
    }

    @Override
    public OptionEntity update(OptionEntity placeOption) {
        return optionRepository.update(placeOption);
    }

    @Override
    public List<OptionEntity> getAll(Pageable pageable) {
        return optionRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<OptionEntity> findAll(Specification<OptionEntity> specification, Pageable pageable) {
        return optionRepository.findAll(specification, pageable);
    }

    @Override
    public List<PlaceOptionDto> convertToDtos(List<OptionEntity> entities) {
        return OptionConvertor.placeOptionsToPlaceOptionDtos(entities);
    }

    @Override
    public Page<PlaceOptionDto> convertToDtos(Page<OptionEntity> entities) {
        return entities.map(OptionConvertor::placeOptionToPlaceOptionDto);
    }

    @Override
    public PlaceOptionDto getById(long id) {
        OptionEntity placeOption = getEntityById(id);
        return OptionConvertor.placeOptionToPlaceOptionDto(placeOption);
    }

    @Override
    public OptionEntity getEntityById(long id) {
        return optionRepository.getById(id);
    }

    @Override
    public PlaceOptionDto delete(PlaceOptionParam placeOptionParam) {
        OptionEntity placeOption = getEntityById(placeOptionParam.getId());
        OptionEntity deletedPlaceOption = delete(placeOption);
        return OptionConvertor.placeOptionToPlaceOptionDto(deletedPlaceOption);
    }

    @Override
    public OptionEntity delete(OptionEntity placeOption) {
        return optionRepository.deleteById2(placeOption);
    }
}
