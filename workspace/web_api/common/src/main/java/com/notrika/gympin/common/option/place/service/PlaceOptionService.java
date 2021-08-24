package com.notrika.gympin.common.option.place.service;

import com.notrika.gympin.common.option.place.dto.PlaceOptionDto;
import com.notrika.gympin.common.option.place.param.PlaceOptionParam;
import com.notrika.gympin.common.primitive.param.LongParam;

import java.util.List;

public interface PlaceOptionService {

    PlaceOptionDto addPlaceOption(PlaceOptionParam placeOptionParam);

    PlaceOptionDto updatePLaceOption(PlaceOptionParam placeOptionParam);

    List<PlaceOptionDto> getAllPlaceOption();

    PlaceOptionDto getPlaceOptionById(LongParam longParam);

    void deletePlaceOption(PlaceOptionParam placeOptionParam);

}
