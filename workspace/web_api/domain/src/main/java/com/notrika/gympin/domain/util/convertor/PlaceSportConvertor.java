package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.place.placeGym.Gym.dto.PlaceGymDto;
import com.notrika.gympin.common.place.placeGym.GymSport.dto.PlaceSportDto;
import com.notrika.gympin.common.place.placeGym.sport.dto.SportDto;
import com.notrika.gympin.persistence.entity.place.Gym.GymSportEntity;

import java.util.List;
import java.util.stream.Collectors;

public final class PlaceSportConvertor {

    public static PlaceSportDto ToDto(GymSportEntity placeSport) {
        PlaceGymDto placeDto = PlaceConvertor.ToGymDto(placeSport.getPlace());
        SportDto sportDto = SportConvertor.toDto(placeSport.getSport());
        PlaceSportDto placeSportDto = new PlaceSportDto();
        placeSportDto.setId(placeSport.getId());
        //        placeSportDto.setCreatedDate(placeSport.getCreatedDate());
        //        placeSportDto.setUpdatedDate(placeSport.getUpdatedDate());
        //        placeSportDto.setDeleted(placeSport.isDeleted());
        placeSportDto.setPlace(placeDto);
        placeSportDto.setSport(sportDto);
        return placeSportDto;
    }

    public static List<PlaceSportDto> toDto(List<GymSportEntity> placeSportList) {
        return placeSportList.stream().filter(o->!o.isDeleted()).map(PlaceSportConvertor::ToDto).collect(Collectors.toList());
    }
}
