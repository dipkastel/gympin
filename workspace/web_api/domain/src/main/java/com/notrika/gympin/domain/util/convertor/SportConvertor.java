package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.sport.dto.SportDto;
import com.notrika.gympin.persistence.entity.sport.SportEntity;

import java.util.List;
import java.util.stream.Collectors;

public final class SportConvertor {

    public static SportDto sportToSportDto(SportEntity sport) {
        SportDto sportDto = SportDto.builder().id(sport.getId()).isDeleted(sport.isDeleted()).name(sport.getName()).launchStatus(sport.getLaunchStatus()).build();
        if (sport.getSportMultimedias() != null) sportDto.setLogoIds(sport.getSportMultimedias().stream().map(t -> t.getMultimedia().getId()).collect(Collectors.toList()));
        return sportDto;
    }

    public static List<SportDto> sportsToSportDtos(List<SportEntity> sportList) {
        return sportList.stream().map(SportConvertor::sportToSportDto).collect(Collectors.toList());
    }
}
