package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.settings.context.GympinContext;
import com.notrika.gympin.common.settings.context.GympinContextHolder;
import com.notrika.gympin.common.ticket.buyable.dto.TicketDiscountHistoryDto;
import com.notrika.gympin.common.ticket.ticketAppointment.dto.TicketAppointmentDto;
import com.notrika.gympin.common.user.user.enums.UserProvider;
import com.notrika.gympin.common.util.exception.user.UnknownUserException;
import com.notrika.gympin.persistence.entity.ticket.BuyableDiscountHistoryEntity;
import com.notrika.gympin.persistence.entity.ticket.appointment.TicketAppointmentEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;

import java.util.stream.Collectors;

public class TicketAppointmentConvertor {

    public static TicketAppointmentDto toDto(TicketAppointmentEntity entity) {
        TicketAppointmentDto dto = new TicketAppointmentDto();
        dto.setPlace(PlaceConvertor.ToDto(entity.getPlace()));
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setPrice(entity.getPrice());
        dto.setValuePrice(entity.getValuePrice());
        dto.setPlacePrice(entity.getPlacePrice());
        dto.setDiscount(entity.getDiscount());
        dto.setEnable(entity.getEnable());
        dto.setGender(entity.getGender());
        dto.setDescription(entity.getDescription());
        dto.setAppointmentStatus(entity.getAppointmentStatus());
        dto.setExpireDuration(entity.getExpireDuration());
        dto.setAppointmentCapacity(entity.getAppointmentCapacity());
        dto.setTiming(entity.getTiming());
        dto.setUpdatedDate(entity.getUpdatedDate());
        dto.setCreatedDate(entity.getCreatedDate());
        try{
            entity.getDiscountHistory().stream().filter(f->f.getDiscount()==null).collect(Collectors.toList());
        }catch (Exception e){}
        try {
            GympinContext context = GympinContextHolder.getContext();
            if (context == null)
                throw new UnknownUserException();
            UserEntity user = (UserEntity) context.getEntry().get(GympinContext.USER_KEY);
            if(user.getUserProvider()== UserProvider.SMARTIS)
                dto.setPrice(entity.getPlacePrice());
        }catch (Exception e){}
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


}
