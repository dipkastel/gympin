package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.place.option.dto.PlaceOptionDto;
import com.notrika.gympin.common.place.option.dto.OptionOfPlaceDto;
import com.notrika.gympin.persistence.entity.place.option.PlaceOptionOfPlaceEntity;
import com.notrika.gympin.persistence.entity.place.option.PlaceOptionEntity;

import java.util.List;
import java.util.stream.Collectors;

public final class OptionConvertor {

    public static PlaceOptionDto placeOptionToPlaceOptionDto(PlaceOptionEntity placeOption) {
        return PlaceOptionDto.builder().id(placeOption.getId()).createdDate(placeOption.getCreatedDate()).updatedDate(placeOption.getUpdatedDate()).isDeleted(placeOption.isDeleted()).name(placeOption.getName()).weight(placeOption.getWeight()).build();
    }

    public static List<PlaceOptionDto> placeOptionsToPlaceOptionDtos(List<PlaceOptionEntity> placeOptions) {
        return placeOptions.stream().filter(o->!o.isDeleted()).map(OptionConvertor::placeOptionToPlaceOptionDto).collect(Collectors.toList());
    }

    public static PlaceOptionEntity placeOptionDtoToPlaceOption(PlaceOptionDto placeOption) {
        return PlaceOptionEntity.builder().id(placeOption.getId()).createdDate(placeOption.getCreatedDate()).updatedDate(placeOption.getUpdatedDate()).deleted(placeOption.isDeleted()).name(placeOption.getName()).weight(placeOption.getWeight()).build();
    }

    public static OptionOfPlaceDto optionOfPlaceToOptionOfPlaceDto(PlaceOptionOfPlaceEntity optionOfPlace) {
        return OptionOfPlaceDto.builder()
                .id(optionOfPlace.getId())
                .place(PlaceConvertor.toDto(optionOfPlace.getPlace()))
                .placeOption(placeOptionToPlaceOptionDto(optionOfPlace.getPlaceOption()))
                .build();
    }

    public static List<OptionOfPlaceDto> optionsOfPlaceToOptionsOfPlaceDto(List<PlaceOptionOfPlaceEntity> placeOptions) {
        return placeOptions.stream().filter(o->!o.isDeleted()).map(OptionConvertor::optionOfPlaceToOptionOfPlaceDto).collect(Collectors.toList());
    }
}
