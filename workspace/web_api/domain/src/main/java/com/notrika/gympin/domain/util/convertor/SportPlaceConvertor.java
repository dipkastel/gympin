package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.place.place.dto.PlaceDto;
import com.notrika.gympin.common.sport.dto.SportDto;
import com.notrika.gympin.common.sportplace.dto.SportPlaceDto;
import com.notrika.gympin.persistence.entity.sportplace.SportPlaceEntity;

import java.util.List;
import java.util.stream.Collectors;

public final class SportPlaceConvertor {

    public static SportPlaceDto sportPlaceToSportPlaceDto(SportPlaceEntity sportPlace) {
        PlaceDto placeDto = PlaceConvertor.toDto(sportPlace.getPlace());
        SportDto sportDto = SportConvertor.toDto(sportPlace.getSport());
        SportPlaceDto sportPlaceDto = new SportPlaceDto();
        sportPlaceDto.setId(sportPlace.getId());
        //        sportPlaceDto.setCreatedDate(sportPlace.getCreatedDate());
        //        sportPlaceDto.setUpdatedDate(sportPlace.getUpdatedDate());
        //        sportPlaceDto.setDeleted(sportPlace.isDeleted());
        sportPlaceDto.setPlace(placeDto);
        sportPlaceDto.setSport(sportDto);
        return sportPlaceDto;
    }

    public static List<SportPlaceDto> toDto(List<SportPlaceEntity> sportPlaceList) {
        return sportPlaceList.stream().map(SportPlaceConvertor::sportPlaceToSportPlaceDto).collect(Collectors.toList());
    }
}
