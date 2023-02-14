package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.ticket.dto.TicketDto;
import com.notrika.gympin.common.ticket.dto.TicketEntryDto;
import com.notrika.gympin.common.ticket.dto.TicketEntryMessageDto;
import com.notrika.gympin.common.ticket.dto.TicketScannedDto;
import com.notrika.gympin.persistence.entity.ticket.TicketEntity;
import com.notrika.gympin.persistence.entity.ticket.TicketEntryEntity;
import com.notrika.gympin.persistence.entity.ticket.TicketEntryMessageEntity;

import java.util.List;
import java.util.stream.Collectors;

public final class TicketConvertor {

    public static TicketDto toDto(TicketEntity entity) {
        TicketDto dto = TicketDto.builder()
                .id(entity.getId())
                .status(entity.getStatus())
                .plan(PlanConvertor.toDto(entity.getPlan()))
                .user(UserConvertor.toDtoSimple(entity.getUser()))
                .planName(entity.getPlanName())
                .price(entity.getPrice())
                .serial(entity.getPaymentSerial())
                .description(entity.getDescription())
                .entryTotalCount(entity.getEntryTotalCount())
                .planExpireDate(entity.getPlanExpireDate())
                .expireDate(entity.getExpireDate())
                .entryList(TicketConvertor.toDto(entity.getEntryList()))
                .build();
        return dto;
    }

    private static List<TicketEntryDto> toDto(List<TicketEntryEntity> entryList) {
        if (entryList==null) return null;
        return entryList.stream().map(TicketConvertor::toDto).collect(Collectors.toList());
    }

    public static TicketEntryDto toDto(TicketEntryEntity entity) {
        TicketEntryDto dto = TicketEntryDto.builder()
                .id(entity.getId())
                .enterDate(entity.getEnterDate())
                .exitDate(entity.getExitDate())
                .ticketEntryStatus(entity.getTicketEntryStatus())
                .entryMessageList(toMessageDto(entity.getMessages()))
                .build();
        return dto;
    }
    public static TicketScannedDto toScannedDto(TicketEntity entity) {
        TicketScannedDto dto = TicketScannedDto.builder()
                .id(entity.getId())
                .status(entity.getStatus())
                .plan(PlanConvertor.toDto(entity.getPlan()))
                .user(UserConvertor.toDtoLessDetails(entity.getUser()))
                .planName(entity.getPlanName())
                .price(entity.getPrice())
                .serial(entity.getPaymentSerial())
                .description(entity.getDescription())
                .entryTotalCount(entity.getEntryTotalCount())
                .userEntryCount(entity.getEntryList().size())
                .planExpireDate(entity.getPlanExpireDate())
                .expireDate(entity.getExpireDate())
                .build();
        return dto;
    }
    private static List<TicketEntryMessageDto> toMessageDto(List<TicketEntryMessageEntity> messagesList) {
        if (messagesList==null) return null;
        return messagesList.stream().map(TicketConvertor::toMessageDto).collect(Collectors.toList());
    }
    private static TicketEntryMessageDto toMessageDto(TicketEntryMessageEntity message) {
        TicketEntryMessageDto dto = TicketEntryMessageDto.builder()
                .id(message.getId())
                .message(message.getMessage())
                .build();
        return dto;
    }

}
