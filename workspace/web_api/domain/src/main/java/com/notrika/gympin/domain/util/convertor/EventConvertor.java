package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.event.BaseEventDto;
import com.notrika.gympin.common.event.general.dto.EventParticipantDto;
import com.notrika.gympin.common.event.walking.dto.WalkingEventDto;
import com.notrika.gympin.common.event.walking.param.WalkingEventParam;
import com.notrika.gympin.persistence.entity.event.EventParticipantEntity;
import com.notrika.gympin.persistence.entity.event.WalkingEventEntity;

import java.util.stream.Collectors;

public final class EventConvertor {

    public static WalkingEventDto walkingEventEntityToDto(WalkingEventEntity entity) {
        WalkingEventDto dto=new WalkingEventDto();
        dto.setId(entity.getId());
        dto.setSport(SportConvertor.sportToSportDto(entity.getSport()));
        dto.setTitle(entity.getTitle());
        dto.setStartLatitude(entity.getStartLatitude());
        dto.setStartLongitude(entity.getStartLongitude());
        dto.setEndLatitude(entity.getEndLatitude());
        dto.setEndLongitude(entity.getEndLongitude());
        dto.setParticipantCount(entity.getParticipantCount());
        dto.setParticipants(entity.getParticipants().stream().map(c -> UserConvertor.userToUserDtoComplete(c.getUser())).collect(Collectors.toList()));
        dto.setOwner(UserConvertor.userToUserDtoComplete(entity.getCreatorUser()));
        dto.setStartDate(entity.getStartDate());
        dto.setAddress(entity.getAddress());
        return dto;
    }

    public static EventParticipantDto eventParticipantEntityToDto(EventParticipantEntity entity) {
        EventParticipantDto dto=new EventParticipantDto();
        dto.setId(entity.getId());
        dto.setEvent(BaseEventDto.builder().id(entity.getEvent().getId()).build());
        dto.setUser(UserConvertor.userToUserDtoComplete(entity.getUser()));
        return dto;
    }

    public static WalkingEventEntity walkingEventParamToEntity(WalkingEventParam param){
        WalkingEventEntity walkingEvent = new WalkingEventEntity();
        walkingEventParamToEntity(param,walkingEvent);
        return walkingEvent;
    }

    public static WalkingEventEntity walkingEventParamToEntity(WalkingEventParam param,WalkingEventEntity walkingEvent){
        walkingEvent.setTitle(param.getTitle());
        walkingEvent.setDescription(param.getDescription());
        walkingEvent.setStartLatitude(param.getStartLatitude());
        walkingEvent.setStartLongitude(param.getStartLongitude());
        walkingEvent.setEndLatitude(param.getEndLatitude());
        walkingEvent.setEndLongitude(param.getEndLongitude());
        walkingEvent.setParticipantCount(param.getParticipantCount());
        walkingEvent.setStartDate(param.getStartDate());
        walkingEvent.setAddress(param.getAddress());
        return walkingEvent;
    }

}
