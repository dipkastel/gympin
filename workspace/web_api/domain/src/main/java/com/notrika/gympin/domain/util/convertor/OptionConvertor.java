package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.option.place.dto.PlaceOptionDto;
import com.notrika.gympin.persistence.entity.option.place.PlaceOptionEntity;

import java.util.List;
import java.util.stream.Collectors;

public final class OptionConvertor {

    public static PlaceOptionDto placeOptionToPlaceOptionDto(PlaceOptionEntity placeOption) {
        return PlaceOptionDto.builder().id(placeOption.getId()).createdDate(placeOption.getCreatedDate()).updatedDate(placeOption.getUpdatedDate()).isDeleted(placeOption.isDeleted()).name(placeOption.getName()).build();
    }

    public static List<PlaceOptionDto> placeOptionsToPlaceOptionDtos(List<PlaceOptionEntity> placeOptions) {
        return placeOptions.stream().map(OptionConvertor::placeOptionToPlaceOptionDto).collect(Collectors.toList());
    }

    public static PlaceOptionEntity placeOptionDtoToPlaceOption(PlaceOptionDto placeOption) {
        return PlaceOptionEntity.builder().id(placeOption.getId()).createdDate(placeOption.getCreatedDate()).updatedDate(placeOption.getUpdatedDate()).deleted(placeOption.isDeleted()).name(placeOption.getName()).build();
    }

}
