package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.sport.dto.SportDto;
import com.notrika.gympin.dao.sport.Sport;

import java.util.List;
import java.util.stream.Collectors;

public class SportConvertor {

    public static SportDto sportToSportDto(Sport sport) {
        return SportDto.builder().id(sport.getId()).createdDate(sport.getCreatedDate()).updatedDate(sport.getUpdatedDate()).isDeleted(sport.isDeleted()).name(sport.getName()).build();
    }

    public static List<SportDto> sportsToSportDtos(List<Sport> sportList) {
        return sportList.stream().map(SportConvertor::sportToSportDto).collect(Collectors.toList());
    }
}
