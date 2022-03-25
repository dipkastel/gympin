package com.notrika.gympin.domain.option.place;

import com.notrika.gympin.common.option.place.dto.PlaceOptionDto;
import com.notrika.gympin.common.option.place.param.PlaceOptionParam;
import com.notrika.gympin.common.option.place.service.PlaceOptionService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.OptionConvertor;
import com.notrika.gympin.persistence.dao.repository.PlaceOptionRepository;
import com.notrika.gympin.persistence.entity.option.place.PlaceOption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaceOptionServiceImpl extends AbstractBaseService<PlaceOptionParam, PlaceOptionDto, PlaceOption> implements PlaceOptionService {

    @Autowired
    private PlaceOptionRepository placeOptionRepository;

    @Override
    public PlaceOptionDto add(PlaceOptionParam placeOptionParam) {
        PlaceOption initPlaceOption = PlaceOption.builder().name(placeOptionParam.getName()).build();
        PlaceOption placeOption = add(initPlaceOption);
        return OptionConvertor.placeOptionToPlaceOptionDto(placeOption);
    }

    @Override
    public PlaceOption add(PlaceOption placeOption) {
        return placeOptionRepository.add(placeOption);
    }

    @Override
    public PlaceOptionDto update(PlaceOptionParam placeOptionParam) {
        PlaceOption initPlaceOption = getEntityById(placeOptionParam.getId());
        initPlaceOption.setName(placeOptionParam.getName());
        PlaceOption placeOption = update(initPlaceOption);
        return OptionConvertor.placeOptionToPlaceOptionDto(placeOption);
    }

    @Override
    public PlaceOption update(PlaceOption placeOption) {
        return placeOptionRepository.update(placeOption);
    }

    @Override
    public List<PlaceOption> getAll(Pageable pageable) {
        return placeOptionRepository.findAllUndeleted(pageable);
    }

    @Override
    public List<PlaceOptionDto> convertToDtos(List<PlaceOption> entities) {
        return OptionConvertor.placeOptionsToPlaceOptionDtos(entities);
    }

    @Override
    public PlaceOptionDto getById(long id) {
        PlaceOption placeOption = getEntityById(id);
        return OptionConvertor.placeOptionToPlaceOptionDto(placeOption);
    }

    @Override
    public PlaceOption getEntityById(long id) {
        return placeOptionRepository.getById(id);
    }

    @Override
    public PlaceOptionDto delete(PlaceOptionParam placeOptionParam) {
        PlaceOption placeOption = getEntityById(placeOptionParam.getId());
        PlaceOption deletedPlaceOption = delete(placeOption);
        return OptionConvertor.placeOptionToPlaceOptionDto(deletedPlaceOption);
    }

    @Override
    public PlaceOption delete(PlaceOption placeOption) {
        return placeOptionRepository.deleteById2(placeOption);
    }
}
