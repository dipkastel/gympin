package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.sport.sport.dto.SportDto;
import com.notrika.gympin.persistence.entity.sport.SportEntity;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

public final class SportConvertor {

    public static SportDto toDto(SportEntity sport) {
        SportDto sportDto = SportDto.builder().id(sport.getId()).isDeleted(sport.isDeleted()).name(sport.getName()).launchStatus(sport.getLaunchStatus()).build();
        if (sport.getSportMultimedias() != null) sportDto.setLogoIds(sport.getSportMultimedias().stream().map(t -> t.getMultimedia().getId()).collect(Collectors.toList()));
        return sportDto;
    }

    public static List<SportDto> toDto(List<SportEntity> sportList) {
        return sportList.stream().map(SportConvertor::toDto).collect(Collectors.toList());
    }
    public static Page<SportDto> toDto(Page<SportEntity> sportList) {
        return sportList.map(SportConvertor::toDto);
    }
}
