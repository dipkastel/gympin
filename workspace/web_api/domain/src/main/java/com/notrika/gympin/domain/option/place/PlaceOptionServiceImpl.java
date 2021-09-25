package com.notrika.gympin.domain.option.place;

import com.notrika.gympin.common.option.place.dto.PlaceOptionDto;
import com.notrika.gympin.common.option.place.param.PlaceOptionParam;
import com.notrika.gympin.common.option.place.service.PlaceOptionService;
import com.notrika.gympin.dao.option.place.PlaceOption;
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
        PlaceOption placeOption = addPlaceOption(initPlaceOption);
        return OptionConvertor.placeOptionToPlaceOptionDto(placeOption);
    }

    public PlaceOption addPlaceOption(PlaceOption placeOption) {
        return placeOptionRepository.add(placeOption);
    }

    @Override
    public PlaceOptionDto updatePLaceOption(PlaceOptionParam placeOptionParam) {
        PlaceOption initPlaceOption = getPlaceOptionById(placeOptionParam.getId());
        initPlaceOption.setName(placeOptionParam.getName());
        PlaceOption placeOption = updatePLaceOption(initPlaceOption);
        return OptionConvertor.placeOptionToPlaceOptionDto(placeOption);
    }

    public PlaceOption updatePLaceOption(PlaceOption placeOption) {
        return placeOptionRepository.update(placeOption);
    }

    @Override
    public List<PlaceOptionDto> getAllPlaceOptionDto() {
        List<PlaceOption> placeOptionList = getAllPlaceOption();
        return OptionConvertor.placeOptionsToPlaceOptionDtos(placeOptionList);
    }

    public List<PlaceOption> getAllPlaceOption() {
        return placeOptionRepository.findAll();
    }

    @Override
    public PlaceOptionDto getPlaceOptionDtoById(long id) {
        PlaceOption placeOption = getPlaceOptionById(id);
        return OptionConvertor.placeOptionToPlaceOptionDto(placeOption);
    }

    public PlaceOption getPlaceOptionById(long id) {
        return placeOptionRepository.getById(id);
    }

    @Override
    public void deletePlaceOption(PlaceOptionParam placeOptionParam) {
        PlaceOption placeOption = getPlaceOptionById(placeOptionParam.getId());
        deletePlaceOption(placeOption);
    }

    public void deletePlaceOption(PlaceOption placeOption) {
       placeOptionRepository.deleteById2(placeOption);
    }
}
