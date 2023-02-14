package com.notrika.gympin.domain.place;

import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.place.option.dto.PlaceOptionDto;
import com.notrika.gympin.common.place.option.param.PlaceOptionParam;
import com.notrika.gympin.common.place.option.service.PlaceOptionService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.OptionConvertor;
import com.notrika.gympin.persistence.dao.repository.PlaceOptionRepository;
import com.notrika.gympin.persistence.entity.place.option.PlaceOptionEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaceOptionServiceImpl extends AbstractBaseService<PlaceOptionParam, PlaceOptionDto, BaseQuery<?>, PlaceOptionEntity> implements PlaceOptionService {

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
    public Page<PlaceOptionEntity> findAll(Specification<PlaceOptionEntity> specification, Pageable pageable) {
        return null;
    }

    @Override
    public List<PlaceOptionDto> convertToDtos(List<PlaceOptionEntity> entities) {
        return OptionConvertor.placeOptionsToPlaceOptionDtos(entities);
    }

    @Override
    public Page<PlaceOptionDto> convertToDtos(Page<PlaceOptionEntity> entities) {
        return null;
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
