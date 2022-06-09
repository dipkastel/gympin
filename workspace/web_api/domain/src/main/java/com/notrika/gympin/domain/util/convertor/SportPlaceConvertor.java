package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.location.dto.PlaceDto;
import com.notrika.gympin.common.sport.dto.SportDto;
import com.notrika.gympin.common.sportplace.dto.SportPlaceDto;
import com.notrika.gympin.persistence.entity.sportplace.SportPlace;

import java.util.List;
import java.util.stream.Collectors;

public final class SportPlaceConvertor {

    public static SportPlaceDto sportPlaceToSportPlaceDto(SportPlace sportPlace) {
        PlaceDto placeDto = LocationConvertor.placeToPlaceDto(sportPlace.getPlace());
        SportDto sportDto = SportConvertor.sportToSportDto(sportPlace.getSport());
        SportPlaceDto sportPlaceDto = new SportPlaceDto();
        sportPlaceDto.setId(sportPlace.getId());
//        sportPlaceDto.setCreatedDate(sportPlace.getCreatedDate());
//        sportPlaceDto.setUpdatedDate(sportPlace.getUpdatedDate());
//        sportPlaceDto.setDeleted(sportPlace.isDeleted());
        sportPlaceDto.setPlace(placeDto);
        sportPlaceDto.setSport(sportDto);
        return sportPlaceDto;
    }

    public static List<SportPlaceDto> sportPlacesToSportPlaceDtos(List<SportPlace> sportPlaceList) {
        return sportPlaceList.stream().map(SportPlaceConvertor::sportPlaceToSportPlaceDto).collect(Collectors.toList());
    }
}
