package com.notrika.gympin.common.option.place.api;

import com.notrika.gympin.common.option.place.dto.PlaceOptionDto;
import com.notrika.gympin.common.option.place.param.PlaceOptionParam;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface PlaceOptionController {

    ResponseEntity<PlaceOptionDto> addPlaceOption(PlaceOptionParam placeOptionParam);

    ResponseEntity<PlaceOptionDto> updatePLaceOption(PlaceOptionParam placeOptionParam);

    ResponseEntity<List<PlaceOptionDto>> getAllPlaceOption();

    ResponseEntity<PlaceOptionDto> getPlaceOptionById(long id);

    ResponseEntity<PlaceOptionDto> deletePlaceOption(PlaceOptionParam placeOptionParam);
}
