package com.notrika.gympin.common.option.place.service;

import com.notrika.gympin.common.location.dto.PlaceDto;
import com.notrika.gympin.common.option.place.dto.PlaceOptionDto;
import com.notrika.gympin.common.option.place.param.PlaceOptionParam;

public interface PlaceOptionService {
    PlaceOptionDto addPlaceOption(PlaceOptionParam placeOptionParam);
}
