package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.purchased.purchasedSubscribe.dto.PurchasedSubscribeDto;
import com.notrika.gympin.common.purchased.purchasedSubscribe.dto.PurchasedSubscribeEntryDto;
import com.notrika.gympin.common.purchased.purchasedSubscribe.dto.PurchasedSubscribeEntryMessageDto;
import com.notrika.gympin.common.purchased.purchasedSubscribe.dto.PurchasedSubscribeScannedDto;
import com.notrika.gympin.common.settings.base.dto.SettingDto;
import com.notrika.gympin.common.settings.base.service.SettingsService;
import com.notrika.gympin.domain.settings.SettingsServiceImpl;
import com.notrika.gympin.persistence.entity.purchased.purchasedSubscribe.PurchasedSubscribeEntity;
import com.notrika.gympin.persistence.entity.purchased.purchasedSubscribe.PurchasedSubscribeEntryEntity;
import com.notrika.gympin.persistence.entity.purchased.purchasedSubscribe.PurchasedSubscribeMessageEntity;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public final class PurchasedSubscribeConvertor {
    public static PurchasedSubscribeDto toDto(PurchasedSubscribeEntity entity) {
        if(entity==null) return null;
        Boolean useExpire = null;
        Calendar c = Calendar.getInstance();
        if(entity.getEntryList().size()<1){
            c.setTime(entity.getCreatedDate());
            c.add(Calendar.HOUR, getTicketUsageThreshold());
            useExpire = (c.getTime().before(new Date()));
        }
        PurchasedSubscribeDto dto = PurchasedSubscribeDto.builder()
                .id(entity.getId())
                .status(entity.getStatus())
                .ticketSubscribe(TicketSubscribeConvertor.toDto(entity.getTicketSubscribe()))
                .user(UserConvertor.toDtoSimple(entity.getCustomer()))
                .name(entity.getName())
                .price(entity.getSellPrice())
                .placePrice(entity.getPlacePrice())
                .key(entity.getKey())
                .serial(entity.getSerials().stream().map(SerialConvertor::ToDto).collect(Collectors.toList()))
                .description(entity.getDescription())
                .entryTotalCount(entity.getEntryTotalCount())
                .timing(entity.getTiming())
                .ticketSubscribeExpireDate(entity.getTicketSubscribeExpireDate())
                .expireDate(entity.getExpireDate())
                .entryList(toDto(entity.getEntryList()))
                .useExpire(useExpire)
                .useExpireDate(c.getTime())
                .build();
        return dto;
    }

    private static Integer getTicketUsageThreshold() {
        try{
            return Integer.parseInt(new SettingsServiceImpl().getByKey("TICKET_USAGE_THRESHOLD").getValue());
        }catch (Exception e){
            return 70;
        }
    }

    private static List<PurchasedSubscribeEntryDto> toDto(List<PurchasedSubscribeEntryEntity> entryList) {
        if (entryList == null) return null;
        return entryList.stream().filter(o->!o.isDeleted()).map(PurchasedSubscribeConvertor::toDto).collect(Collectors.toList());
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
                .key(entity.getKey())
                .price(entity.getSellPrice())
                .timing(entity.getTiming())
                .placePrice(entity.getPlacePrice())
                .serials(entity.getSerials().stream().filter(o->!o.isDeleted()).map(SerialConvertor::ToDto).collect(Collectors.toList()))
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
        return messagesList.stream().filter(o->!o.isDeleted()).map(PurchasedSubscribeConvertor::toMessageDto).collect(Collectors.toList());
    }

    private static PurchasedSubscribeEntryMessageDto toMessageDto(PurchasedSubscribeMessageEntity message) {
        PurchasedSubscribeEntryMessageDto dto = PurchasedSubscribeEntryMessageDto.builder()
                .id(message.getId())
                .message(message.getMessage())
                .build();
        return dto;
    }

}
