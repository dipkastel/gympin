package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.place.place.dto.PlaceDto;
import com.notrika.gympin.common.place.placeSport.dto.PlaceSportDto;
import com.notrika.gympin.common.sport.sport.dto.SportDto;
import com.notrika.gympin.persistence.entity.sport.placeSport.PlaceSportEntity;

import java.util.List;
import java.util.stream.Collectors;

public final class PlaceSportConvertor {

    public static PlaceSportDto ToDto(PlaceSportEntity placeSport) {
        PlaceDto placeDto = PlaceConvertor.toDto(placeSport.getPlace());
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

    public static List<PlaceSportDto> toDto(List<PlaceSportEntity> placeSportList) {
        return placeSportList.stream().filter(o->!o.isDeleted()).map(PlaceSportConvertor::ToDto).collect(Collectors.toList());
    }
}
