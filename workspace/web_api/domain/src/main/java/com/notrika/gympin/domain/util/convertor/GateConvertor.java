package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.context.GympinContext;
import com.notrika.gympin.common.gate.dto.GateDto;
import com.notrika.gympin.common.gate.dto.GateTimingDto;
import com.notrika.gympin.common.gate.dto.GateTrafficDto;
import com.notrika.gympin.common.gate.param.GateParam;
import com.notrika.gympin.common.gate.param.GateTimingParam;
import com.notrika.gympin.common.plan.dto.PlanGateTimingDto;
import com.notrika.gympin.domain.place.PlaceServiceImpl;
import com.notrika.gympin.domain.sport.SportServiceImpl;
import com.notrika.gympin.persistence.entity.gate.GateEntity;
import com.notrika.gympin.persistence.entity.gate.GateTimingEntity;
import com.notrika.gympin.persistence.entity.gate.GateTrafficEntity;
import com.notrika.gympin.persistence.entity.plan.PlanGateTimingEntity;

import java.util.ArrayList;
import java.util.List;

public final class GateConvertor {

    public static GateEntity convertToEntity(GateParam gateParam) {
        GateEntity gateEntity = new GateEntity();
        gateEntity.setName(gateParam.getName());
        gateEntity.setEnable(true);
        gateEntity.setTrafficManagement(gateParam.getTrafficManagement());
        gateEntity.setDeleted(false);
        gateEntity.setPlace(GympinContext.getBean(PlaceServiceImpl.class).getEntityById(gateParam.getPlace().getId()));
        try{
            gateEntity.setSport(GympinContext.getBean(SportServiceImpl.class).getEntityById(gateParam.getSport().getId()));
        }catch (Exception e){}
        try{
            List<GateTimingEntity> gateTimingEntities=new ArrayList<>();
            gateEntity.setGateTimings(gateTimingEntities);
            for (GateTimingParam gateTiming: gateParam.getGateTimings()) {
                gateTimingEntities.add(convertToGateTimingEntity(gateTiming,gateEntity));
            }
        }catch (Exception e){}

        return gateEntity;
    }

    public static GateDto convertToDto(GateEntity entity) {
        GateDto gateDto = new GateDto();
        gateDto.setId(entity.getId());
        gateDto.setName(entity.getName());
        gateDto.setEnable(entity.getEnable());
        gateDto.setTrafficManagement(entity.getTrafficManagement());
        gateDto.setPlace(PlaceConvertor.toDto(entity.getPlace()));
        try {
            gateDto.setSport(SportConvertor.toDto(entity.getSport()));
        }catch (Exception e){}
        return gateDto;
    }

    public static GateTimingDto convertToGateTimingDto(GateTimingEntity entity) {
        GateTimingDto gateTimingDto = new GateTimingDto();
        gateTimingDto.setId(entity.getId());
        gateTimingDto.setGate(convertToDto(entity.getGate()));
        gateTimingDto.setName(entity.getName());
        gateTimingDto.setDayOfWeek(entity.getDayOfWeek());
        gateTimingDto.setOpeningTime(entity.getOpeningTime());
        gateTimingDto.setClosingTime(entity.getClosingTime());
        return gateTimingDto;
    }

    public static GateTimingEntity convertToGateTimingEntity(GateTimingParam gateTimingParam,GateEntity gate){
        GateTimingEntity gateTimingEntity=new GateTimingEntity();
        gateTimingEntity.setId(gateTimingParam.getId());
        gateTimingEntity.setGate(gate);
        gateTimingEntity.setName(gateTimingParam.getName());
        gateTimingEntity.setDayOfWeek(gateTimingParam.getDayOfWeek());
        gateTimingEntity.setOpeningTime(gateTimingParam.getOpeningTime());
        gateTimingEntity.setClosingTime(gateTimingParam.getClosingTime());
        gateTimingEntity.setDeleted(false);
        return gateTimingEntity;

    }
    public static PlanGateTimingDto convertToPlanGateDto(PlanGateTimingEntity planGateEntity){
        PlanGateTimingDto planGateDto=new PlanGateTimingDto();
        planGateDto.setGateTimings(GateConvertor.convertToGateTimingDto(planGateEntity.getGateTimings()));
        planGateDto.setEntryCount(planGateEntity.getEntryCount());
        return planGateDto;
    }

    public static GateTrafficDto convertToGateTrafficDto(GateTrafficEntity gateTraffics) {
        if(gateTraffics==null)return null;
        GateTrafficDto gateTrafficDto = new GateTrafficDto();
        gateTrafficDto.setTraffic(gateTraffics.getTraffic());
        return gateTrafficDto;
    }
}
