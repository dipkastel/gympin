package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.purchased.purchasedSubscribe.dto.PurchasedSubscribeDto;
import com.notrika.gympin.common.purchased.purchasedSubscribe.dto.PurchasedSubscribeEntryDto;
import com.notrika.gympin.common.purchased.purchasedSubscribe.dto.PurchasedSubscribeEntryMessageDto;
import com.notrika.gympin.common.purchased.purchasedSubscribe.dto.PurchasedSubscribeScannedDto;
import com.notrika.gympin.persistence.entity.purchased.purchasedSubscribe.PurchasedSubscribeEntity;
import com.notrika.gympin.persistence.entity.purchased.purchasedSubscribe.PurchasedSubscribeEntryEntity;
import com.notrika.gympin.persistence.entity.purchased.purchasedSubscribe.PurchasedSubscribeMessageEntity;

import java.util.List;
import java.util.stream.Collectors;

public final class PurchasedSubscribeConvertor {

    public static PurchasedSubscribeDto toDto(PurchasedSubscribeEntity entity) {
        if(entity==null) return null;
        PurchasedSubscribeDto dto = PurchasedSubscribeDto.builder()
                .id(entity.getId())
                .status(entity.getStatus())
                .ticketSubscribe(TicketSubscribeConvertor.toDto(entity.getTicketSubscribe()))
                .user(UserConvertor.toDtoSimple(entity.getCustomer()))
                .name(entity.getName())
                .price(entity.getSellPrice())
                .placePrice(entity.getPlacePrice())
                .serial(SerialConvertor.ToDto(entity.getSerial()))
                .description(entity.getDescription())
                .entryTotalCount(entity.getEntryTotalCount())
                .ticketSubscribeExpireDate(entity.getTicketSubscribeExpireDate())
                .expireDate(entity.getExpireDate())
                .entryList(PurchasedSubscribeConvertor.toDto(entity.getEntryList()))
                .build();
        return dto;
    }

    private static List<PurchasedSubscribeEntryDto> toDto(List<PurchasedSubscribeEntryEntity> entryList) {
        if (entryList == null) return null;
        return entryList.stream().map(PurchasedSubscribeConvertor::toDto).collect(Collectors.toList());
    }

    public static PurchasedSubscribeEntryDto toDto(PurchasedSubscribeEntryEntity entity) {
        PurchasedSubscribeEntryDto dto = PurchasedSubscribeEntryDto.builder()
                .id(entity.getId())
                .enterDate(entity.getEnterDate())
                .exitDate(entity.getExitDate())
                .subscribeEntryStatus(entity.getSubscribeEntryStatus())
                .entryMessageList(toMessageDto(entity.getMessages()))
                .build();
        return dto;
    }

    public static PurchasedSubscribeScannedDto toScannedDto(PurchasedSubscribeEntity entity) {
        PurchasedSubscribeScannedDto dto = PurchasedSubscribeScannedDto.builder()
                .id(entity.getId())
                .status(entity.getStatus())
                .ticketSubscribe(TicketSubscribeConvertor.toDto(entity.getTicketSubscribe()))
                .user(UserConvertor.toDtoLessDetails(entity.getCustomer()))
                .name(entity.getName())
                .price(entity.getSellPrice())
                .placePrice(entity.getPlacePrice())
                .serial(SerialConvertor.ToDto(entity.getSerial()))
                .description(entity.getDescription())
                .entryTotalCount(entity.getEntryTotalCount())
                .userEntryCount(entity.getEntryList().size())
                .TicketSubscribeExpireDate(entity.getTicketSubscribeExpireDate())
                .expireDate(entity.getExpireDate())
                .build();
        return dto;
    }

    private static List<PurchasedSubscribeEntryMessageDto> toMessageDto(List<PurchasedSubscribeMessageEntity> messagesList) {
        if (messagesList == null) return null;
        return messagesList.stream().map(PurchasedSubscribeConvertor::toMessageDto).collect(Collectors.toList());
    }

    private static PurchasedSubscribeEntryMessageDto toMessageDto(PurchasedSubscribeMessageEntity message) {
        PurchasedSubscribeEntryMessageDto dto = PurchasedSubscribeEntryMessageDto.builder()
                .id(message.getId())
                .message(message.getMessage())
                .build();
        return dto;
    }

}
