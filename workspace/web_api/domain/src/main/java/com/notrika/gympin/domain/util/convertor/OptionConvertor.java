package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.option.place.dto.PlaceOptionDto;
import com.notrika.gympin.dao.option.place.PlaceOption;

import java.util.List;
import java.util.stream.Collectors;

public class OptionConvertor {

    public static PlaceOptionDto placeOptionToPlaceOptionDto(PlaceOption placeOption) {
        return PlaceOptionDto.builder().id(placeOption.getId()).createdDate(placeOption.getCreatedDate()).updatedDate(placeOption.getUpdatedDate()).isDeleted(placeOption.isDeleted()).name(placeOption.getName()).build();
    }

    public static List<PlaceOptionDto> placeOptionsToPlaceOptionDtos(List<PlaceOption> placeOptions) {
        return placeOptions.stream().map(OptionConvertor::placeOptionToPlaceOptionDto).collect(Collectors.toList());
    }

    public static PlaceOption placeOptionDtoToPlaceOption(PlaceOptionDto placeOption) {
        return PlaceOption.builder().id(placeOption.getId()).createdDate(placeOption.getCreatedDate()).updatedDate(placeOption.getUpdatedDate()).isDeleted(placeOption.isDeleted()).name(placeOption.getName()).build();
    }

}
