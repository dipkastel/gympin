package com.notrika.gympin.domain.option.place;

import com.notrika.gympin.common.option.place.dto.PlaceOptionDto;
import com.notrika.gympin.common.option.place.param.PlaceOptionParam;
import com.notrika.gympin.common.option.place.service.PlaceOptionService;
import com.notrika.gympin.common.primitive.param.LongParam;
import com.notrika.gympin.dao.option.place.PlaceOption;
import com.notrika.gympin.domain.util.convertor.GeneralConvertor;
import com.notrika.gympin.domain.util.convertor.OptionConvertor;
import com.notrika.gympin.persistence.repository.PlaceOptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaceOptionServiceImpl implements PlaceOptionService {

    @Autowired
    private PlaceOptionRepository placeOptionRepository;

    @Override
    public PlaceOptionDto addPlaceOption(PlaceOptionParam placeOptionParam) {
        PlaceOption initPlaceOption = PlaceOption.builder().name(placeOptionParam.getName()).build();
        GeneralConvertor.fillBaseFieldsToCreate(placeOptionParam,initPlaceOption);
        PlaceOption placeOption = placeOptionRepository.save(initPlaceOption);
        return OptionConvertor.placeOptionToPlaceOptionDto(placeOption);
    }

    @Override
    public PlaceOptionDto updatePLaceOption(PlaceOptionParam placeOptionParam) {
        PlaceOption initPlaceOption = PlaceOption.builder().name(placeOptionParam.getName()).build();
        GeneralConvertor.fillBaseFieldsToUpdate(placeOptionParam,initPlaceOption);
        PlaceOption placeOption = placeOptionRepository.save(initPlaceOption);
        return OptionConvertor.placeOptionToPlaceOptionDto(placeOption);
    }

    @Override
    public List<PlaceOptionDto> getAllPlaceOption() {
        List<PlaceOption> placeOptionList = placeOptionRepository.findAll();
        return OptionConvertor.placeOptionsToPlaceOptionDtos(placeOptionList);
    }

    @Override
    public PlaceOptionDto getPlaceOptionById(LongParam longParam) {
        PlaceOption placeOption = placeOptionRepository.getById(longParam.getValue());
        return OptionConvertor.placeOptionToPlaceOptionDto(placeOption);
    }

    @Override
    public void deletePlaceOption(PlaceOptionParam placeOptionParam) {
        placeOptionRepository.deleteById(placeOptionParam.getId());
    }
}
