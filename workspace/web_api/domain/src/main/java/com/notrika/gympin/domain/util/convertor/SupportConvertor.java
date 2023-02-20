package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.support.dto.SupportDto;
import com.notrika.gympin.common.support.dto.SupportMessageDto;
import com.notrika.gympin.persistence.entity.support.SupportEntity;
import com.notrika.gympin.persistence.entity.support.SupportMessagesEntity;

import java.util.List;
import java.util.stream.Collectors;

public final class SupportConvertor {

    public static SupportDto toDto(SupportEntity entity) {
        SupportDto dto = new SupportDto();
        dto.setTitle(entity.getTitle());
        dto.setMessages(toMessagesDto(entity.getSupportMessages()));
        dto.setId(entity.getId());
        dto.setCreatedDate(entity.getCreatedDate());
        dto.setUpdatedDate(entity.getUpdatedDate());
        if(entity.getPlace()!=null)
            dto.setPlace(PlaceConvertor.toDto(entity.getPlace()));
        if(entity.getUser()!=null)
            dto.setUser(UserConvertor.toDtoSimple(entity.getUser()));
        //add corporate
        dto.setCreatorUser(UserConvertor.toDtoSimple(entity.getCreatorUser()));
        return dto;
    }

    public static List<SupportDto> toDto(List<SupportEntity> entities) {
        return entities.stream().map(SupportConvertor::toDto).collect(Collectors.toList());
    }
    public static SupportMessageDto toMessagesDto(SupportMessagesEntity entity) {
        SupportMessageDto dto = new SupportMessageDto();
        dto.setStatus(entity.getSupportMessageStatus());
        dto.setMessage(entity.getSupportMessage());
        dto.setAnswer(entity.isAnswer());
        dto.setId(entity.getId());
        dto.setCreatedDate(entity.getCreatedDate());
        dto.setUpdatedDate(entity.getUpdatedDate());
        dto.setCreatorUser(UserConvertor.toDtoSimple(entity.getCreatorUser()));
        return dto;
    }


    public static List<SupportMessageDto> toMessagesDto(List<SupportMessagesEntity> entities) {
        return entities.stream().map(SupportConvertor::toMessagesDto).collect(Collectors.toList());
    }
}