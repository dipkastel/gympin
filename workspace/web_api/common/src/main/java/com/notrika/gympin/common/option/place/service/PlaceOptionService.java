package com.notrika.gympin.common.option.place.service;

import com.notrika.gympin.common.option.place.dto.PlaceOptionDto;
import com.notrika.gympin.common.option.place.param.PlaceOptionParam;

import java.util.List;

public interface PlaceOptionService {

    PlaceOptionDto addPlaceOption(PlaceOptionParam placeOptionParam);

    PlaceOptionDto updatePLaceOption(PlaceOptionParam placeOptionParam);

    List<PlaceOptionDto> getAllPlaceOptionDto();

    PlaceOptionDto getPlaceOptionDtoById(long id);

    PlaceOptionDto deletePlaceOption(PlaceOptionParam placeOptionParam);

}
