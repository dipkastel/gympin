package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.place.placeGym.sport.dto.SportDto;
import com.notrika.gympin.persistence.entity.place.Gym.SportEntity;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

public final class SportConvertor {

    public static SportDto toDto(SportEntity sport) {
        SportDto sportDto = SportDto.builder().id(sport.getId()).isDeleted(sport.isDeleted()).name(sport.getName()).launchStatus(sport.getLaunchStatus()).build();
        return sportDto;
    }

    public static List<SportDto> toDto(List<SportEntity> sportList) {
        return sportList.stream().filter(o->!o.isDeleted()).map(SportConvertor::toDto).collect(Collectors.toList());
    }
    public static Page<SportDto> toDto(Page<SportEntity> sportList) {
        return sportList.map(SportConvertor::toDto);
    }
}
