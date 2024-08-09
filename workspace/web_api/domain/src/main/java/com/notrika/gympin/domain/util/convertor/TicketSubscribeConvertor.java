package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.ticket.buyable.dto.TicketDiscountHistoryDto;
import com.notrika.gympin.common.ticket.ticketSubscribe.dto.TicketSubscribeDto;
//import com.notrika.gympin.common.ticket.subscribe.dto.TicketSubscribeActionDto;
import com.notrika.gympin.persistence.entity.ticket.BuyableDiscountHistoryEntity;
import com.notrika.gympin.persistence.entity.ticket.subscribe.TicketSubscribeEntity;

import java.util.stream.Collectors;
//import com.notrika.gympin.persistence.entity.ticket.common.TicketSubscribeHallActiveTime;

public class TicketSubscribeConvertor {

    public static TicketSubscribeDto toDto(TicketSubscribeEntity entity) {
        TicketSubscribeDto dto = new TicketSubscribeDto();
        dto.setPlace(PlaceConvertor.toDto(entity.getPlace()));
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setPrice(entity.getPrice());
        dto.setValuePrice(entity.getValuePrice());
        dto.setPlacePrice(entity.getPlacePrice());
        dto.setDiscount(entity.getDiscount());
        dto.setEnable(entity.getEnable());
        dto.setGender(entity.getGender());
        dto.setDescription(entity.getDescription());
        dto.setEntryTotalCount(entity.getEntryTotalCount());
        dto.setExpireDuration(entity.getExpireDuration());
        dto.setSubscribeCapacity(entity.getSubscribeCapacity());
        dto.setTiming(entity.getTiming());
        if(entity.getCoaches()!=null)
            dto.setCoaches(entity.getCoaches().stream().map(UserConvertor::toCoachDto).collect(Collectors.toList()));
        return dto;
    }

    public static TicketDiscountHistoryDto toDto(BuyableDiscountHistoryEntity entity) {
        TicketDiscountHistoryDto dto = new TicketDiscountHistoryDto();
        dto.setId(entity.getId());
        dto.setCreatedDate(entity.getCreatedDate());
        dto.setAfterPrice(entity.getAfterPrice());
        dto.setBeforPrice(entity.getBeforPrice());
        dto.setDiscount(entity.getDiscount());
        return dto;
    }

//    public static TicketSubscribeActionDto convertToTicketSubscribeHallDto(TicketSubscribeHallActiveTime entity) {
//        TicketSubscribeActionDto dto = new TicketSubscribeActionDto();
//        dto.setId(entity.getId());
//        dto.setTicketSubscribe(toDto(entity.getTicketSubscribe()));
//        dto.setAction(HallConvertor.convertToActionDto(entity.getAction()));
//        return dto;
//    }


}
