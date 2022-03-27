package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.event.walking.dto.WalkingEventDto;
import com.notrika.gympin.persistence.entity.event.WalkingEventEntity;

public final class EventConvertor {

    public static WalkingEventDto walkingEventEntityToDto(WalkingEventEntity entity){
        return WalkingEventDto.builder().id(entity.getId()).sport(SportConvertor.sportToSportDto(entity.getSport())).title(entity.getTitle()).description(entity.getDescription()).startLatitude(entity.getStartLatitude()).startLongitude(entity.getStartLongitude()).endLatitude(entity.getEndLatitude()).endLongitude(entity.getEndLongitude()).participantCount(entity.getParticipantCount()).build();
    }

}
