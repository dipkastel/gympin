package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.place.parts.option.dto.PlaceOptionDto;
import com.notrika.gympin.common.place.parts.option.dto.OptionOfPlaceDto;
import com.notrika.gympin.persistence.entity.place.Gym.OptionEntity;
import com.notrika.gympin.persistence.entity.place.Gym.OptionOfGymEntity;

import java.util.List;
import java.util.stream.Collectors;

public final class OptionConvertor {

    public static PlaceOptionDto placeOptionToPlaceOptionDto(OptionEntity placeOption) {
        return PlaceOptionDto.builder().id(placeOption.getId()).createdDate(placeOption.getCreatedDate()).updatedDate(placeOption.getUpdatedDate()).isDeleted(placeOption.isDeleted()).name(placeOption.getName()).weight(placeOption.getWeight()).build();
    }

    public static List<PlaceOptionDto> placeOptionsToPlaceOptionDtos(List<OptionEntity> placeOptions) {
        return placeOptions.stream().filter(o->!o.isDeleted()).map(OptionConvertor::placeOptionToPlaceOptionDto).collect(Collectors.toList());
    }

    public static OptionEntity placeOptionDtoToPlaceOption(PlaceOptionDto placeOption) {
        return OptionEntity.builder().id(placeOption.getId()).createdDate(placeOption.getCreatedDate()).updatedDate(placeOption.getUpdatedDate()).deleted(placeOption.isDeleted()).name(placeOption.getName()).weight(placeOption.getWeight()).build();
    }

    public static OptionOfPlaceDto optionOfPlaceToOptionOfPlaceDto(OptionOfGymEntity optionOfPlace) {
        return OptionOfPlaceDto.builder()
                .id(optionOfPlace.getId())
                .place(PlaceConvertor.ToGymDto(optionOfPlace.getPlace()))
                .placeOption(placeOptionToPlaceOptionDto(optionOfPlace.getPlaceOption()))
                .build();
    }

    public static List<OptionOfPlaceDto> optionsOfPlaceToOptionsOfPlaceDto(List<OptionOfGymEntity> placeOptions) {
        return placeOptions.stream().filter(o->!o.isDeleted()).map(OptionConvertor::optionOfPlaceToOptionOfPlaceDto).collect(Collectors.toList());
    }
}
