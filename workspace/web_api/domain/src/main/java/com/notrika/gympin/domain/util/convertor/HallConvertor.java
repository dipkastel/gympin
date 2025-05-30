package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.ticket.common.param.ActiveTimesParam;
import com.notrika.gympin.common.settings.context.GympinContext;
import com.notrika.gympin.common.place.hall.dto.HallDto;
import com.notrika.gympin.common.ticket.common.dto.ActiveTimesDto;
import com.notrika.gympin.common.place.hall.dto.HallTrafficDto;
import com.notrika.gympin.common.place.hall.param.HallParam;
import com.notrika.gympin.domain.place.PlaceGymServiceImpl;
import com.notrika.gympin.persistence.entity.place.hall.HallEntity;
import com.notrika.gympin.persistence.entity.ticket.common.TicketHallActiveTimeEntity;
import com.notrika.gympin.persistence.entity.place.hall.HallTrafficEntity;

import java.util.ArrayList;
import java.util.List;

public final class HallConvertor {

    public static HallEntity convertToEntity(HallParam hallParam) {
        HallEntity hallEntity = new HallEntity();
        hallEntity.setName(hallParam.getName());
        hallEntity.setEnable(true);
        hallEntity.setTrafficManagement(hallParam.getTrafficManagement());
        hallEntity.setDeleted(false);
        hallEntity.setPlace(GympinContext.getBean(PlaceGymServiceImpl.class).getEntityById(hallParam.getPlace().getId()));

        try{
            List<TicketHallActiveTimeEntity> actionEntities=new ArrayList<>();
            hallEntity.setActions(actionEntities);
            for (ActiveTimesParam action: hallParam.getAction()) {
                actionEntities.add(convertToActionEntity(action, hallEntity));
            }
        }catch (Exception e){}

        return hallEntity;
    }

    public static HallDto convertToDto(HallEntity entity) {
        HallDto hallDto = new HallDto();
        hallDto.setId(entity.getId());
        hallDto.setName(entity.getName());
        hallDto.setEnable(entity.getEnable());
        hallDto.setTrafficManagement(entity.getTrafficManagement());
        hallDto.setPlace(PlaceConvertor.ToGymDto(entity.getPlace()));
        return hallDto;
    }

    public static ActiveTimesDto convertToActionDto(TicketHallActiveTimeEntity entity) {
        ActiveTimesDto activeTimesDto = new ActiveTimesDto();
        activeTimesDto.setId(entity.getId());
        activeTimesDto.setName(entity.getName());
        activeTimesDto.setHall(convertToDto(entity.getHall()));
        activeTimesDto.setDayOfWeek(entity.getDayOfWeek());
        activeTimesDto.setOpeningTime(entity.getOpeningTime());
        activeTimesDto.setClosingTime(entity.getClosingTime());
        return activeTimesDto;
    }

    public static TicketHallActiveTimeEntity convertToActionEntity(ActiveTimesParam activeTimesParam, HallEntity hall){
        TicketHallActiveTimeEntity ticketSubscribeHallActiveTime =new TicketHallActiveTimeEntity();
        ticketSubscribeHallActiveTime.setId(activeTimesParam.getId());
        ticketSubscribeHallActiveTime.setHall(hall);
        ticketSubscribeHallActiveTime.setName(activeTimesParam.getName());
        ticketSubscribeHallActiveTime.setDayOfWeek(activeTimesParam.getDayOfWeek());
        ticketSubscribeHallActiveTime.setOpeningTime(activeTimesParam.getOpeningTime());
        ticketSubscribeHallActiveTime.setClosingTime(activeTimesParam.getClosingTime());
        ticketSubscribeHallActiveTime.setDeleted(false);
        return ticketSubscribeHallActiveTime;

    }
//    public static TicketSubscribeActionDto convertToTicketSubscribeHallDto(TicketSubscribeHallActiveTime ticketSubscribeActionEntity){
//        TicketSubscribeActionDto ticketSubscribeHallDto=new TicketSubscribeActionDto();
//        ticketSubscribeHallDto.setAction(HallConvertor.convertToActionDto(ticketSubscribeActionEntity.getAction()));
//        return ticketSubscribeHallDto;
//    }

    public static HallTrafficDto convertToHallTrafficDto(HallTrafficEntity hallTraffics) {
        if(hallTraffics==null)return null;
        HallTrafficDto hallTrafficDto = new HallTrafficDto();
        hallTrafficDto.setTraffic(hallTraffics.getTraffic());
        return hallTrafficDto;
    }
}
