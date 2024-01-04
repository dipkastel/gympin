package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.ticket.ticketSubscribe.param.ActiveTimesParam;
import com.notrika.gympin.common.settings.context.GympinContext;
import com.notrika.gympin.common.place.hall.dto.HallDto;
import com.notrika.gympin.common.ticket.ticketSubscribe.dto.ActiveTimesDto;
import com.notrika.gympin.common.place.hall.dto.HallTrafficDto;
import com.notrika.gympin.common.place.hall.param.HallParam;
import com.notrika.gympin.domain.place.PlaceServiceImpl;
import com.notrika.gympin.domain.sport.SportServiceImpl;
import com.notrika.gympin.persistence.entity.place.hall.HallEntity;
import com.notrika.gympin.persistence.entity.ticket.subscribe.TicketSubscribeHallActiveTime;
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
        hallEntity.setPlace(GympinContext.getBean(PlaceServiceImpl.class).getEntityById(hallParam.getPlace().getId()));
        try{
            hallEntity.setSport(GympinContext.getBean(SportServiceImpl.class).getEntityById(hallParam.getSport().getId()));
        }catch (Exception e){}
        try{
            List<TicketSubscribeHallActiveTime> actionEntities=new ArrayList<>();
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
        hallDto.setPlace(PlaceConvertor.toDto(entity.getPlace()));
        try {
            hallDto.setSport(SportConvertor.toDto(entity.getSport()));
        }catch (Exception e){}
        return hallDto;
    }

    public static ActiveTimesDto convertToActionDto(TicketSubscribeHallActiveTime entity) {
        ActiveTimesDto activeTimesDto = new ActiveTimesDto();
        activeTimesDto.setId(entity.getId());
        activeTimesDto.setHall(convertToDto(entity.getHall()));
        activeTimesDto.setDayOfWeek(entity.getDayOfWeek());
        activeTimesDto.setOpeningTime(entity.getOpeningTime());
        activeTimesDto.setClosingTime(entity.getClosingTime());
        return activeTimesDto;
    }

    public static TicketSubscribeHallActiveTime convertToActionEntity(ActiveTimesParam activeTimesParam, HallEntity hall){
        TicketSubscribeHallActiveTime ticketSubscribeHallActiveTime =new TicketSubscribeHallActiveTime();
        ticketSubscribeHallActiveTime.setId(activeTimesParam.getId());
        ticketSubscribeHallActiveTime.setHall(hall);
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
