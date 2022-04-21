package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.event.BaseEventDto;
import com.notrika.gympin.common.event.general.dto.EventParticipantDto;
import com.notrika.gympin.common.event.walking.dto.WalkingEventDto;
import com.notrika.gympin.persistence.entity.event.EventParticipantEntity;
import com.notrika.gympin.persistence.entity.event.WalkingEventEntity;

import java.util.stream.Collectors;

public final class EventConvertor {

    public static WalkingEventDto walkingEventEntityToDto(WalkingEventEntity entity) {
        return WalkingEventDto.builder().id(entity.getId()).sport(SportConvertor.sportToSportDto(entity.getSport())).title(entity.getTitle()).description(entity.getDescription()).startLatitude(entity.getStartLatitude()).startLongitude(entity.getStartLongitude()).endLatitude(entity.getEndLatitude()).endLongitude(entity.getEndLongitude()).participantCount(entity.getParticipantCount()).participants(entity.getParticipants().stream().map(c -> UserConvertor.userToUserDto(c.getUser())).collect(Collectors.toList())).owner(UserConvertor.userToUserDto(entity.getCreatorUser())).startDate(entity.getStartDate()).address(entity.getAddress()).build();
    }

    public static EventParticipantDto eventParticipantEntityToDto(EventParticipantEntity entity) {
        return EventParticipantDto.builder().id(entity.getId()).event(BaseEventDto.builder().id(entity.getEvent().getId()).build()).user(UserConvertor.userToUserDto(entity.getUser())).build();
    }

}
