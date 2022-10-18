package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.context.GympinContext;
import com.notrika.gympin.common.location.dto.GateDto;
import com.notrika.gympin.common.location.dto.GateTimingDto;
import com.notrika.gympin.common.location.param.GateParam;
import com.notrika.gympin.common.location.param.GateTimingParam;
import com.notrika.gympin.common.plan.dto.PlanGateDto;
import com.notrika.gympin.common.plan.param.PlanGateParam;
import com.notrika.gympin.domain.location.GateServiceImpl;
import com.notrika.gympin.domain.location.PlaceServiceImpl;
import com.notrika.gympin.domain.sport.SportServiceImpl;
import com.notrika.gympin.domain.user.UserServiceImpl;
import com.notrika.gympin.persistence.entity.location.GateEntity;
import com.notrika.gympin.persistence.entity.location.GateTimingEntity;
import com.notrika.gympin.persistence.entity.plan.PlanGateEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public final class GateConvertor {

    public static GateEntity convertToEntity(GateParam gateParam) {
        GateEntity gateEntity = new GateEntity();
        gateEntity.setName(gateParam.getName());
//        gateEntity.setOpeningTime(gateParam.getOpeningTime());
        gateEntity.setPlace(GympinContext.getBean(PlaceServiceImpl.class).getEntityById(gateParam.getPlace().getId()));
        gateEntity.setSport(GympinContext.getBean(SportServiceImpl.class).getEntityById(gateParam.getSport().getId()));
        gateEntity.setGuard(gateParam.getGuard().stream().map(g->GympinContext.getBean(UserServiceImpl.class).getEntityById(g.getId())).collect(Collectors.toList()));
//                GympinContext.getBean(UserServiceImpl.class).getEntityById(gateParam.getGuard().getId()));
        gateEntity.setOwner(gateParam.getOwner().stream().map(g->GympinContext.getBean(UserServiceImpl.class).getEntityById(g.getId())).collect(Collectors.toList()));
        gateEntity.setAboutGate(gateParam.getAboutGate());
        gateEntity.setGateRules(gateParam.getGateRules());
        gateEntity.setDeleted(false);

        List<GateTimingEntity> gateTimingEntities=new ArrayList<>();
        gateEntity.setGateTimings(gateTimingEntities);

        for (GateTimingParam gateTiming: gateParam.getGateTimings()) {
            gateTimingEntities.add(convertToGateTimingEntity(gateTiming,gateEntity));
        }
        return gateEntity;
    }

    public static GateDto convertToDto(GateEntity entity) {
        GateDto gateDto = new GateDto();
        gateDto.setId(entity.getId());
        gateDto.setName(entity.getName());
//        gateDto.setOpeningTime(entity.getOpeningTime());
//        gateDto.setClosingTime(entity.getClosingTime());
        gateDto.setPlace(LocationConvertor.placeToPlaceDto(entity.getPlace()));
        gateDto.setSport(SportConvertor.sportToSportDto(entity.getSport()));
        gateDto.setGuard(entity.getGuard().stream().map(UserConvertor::userToUserDtoBrief).collect(Collectors.toList()));
        gateDto.setOwner(entity.getOwner().stream().map(UserConvertor::userToUserDtoBrief).collect(Collectors.toList()));
//        UserConvertor.userToUserDtoBrief(entity.getGuard()));
        return gateDto;
    }

    public static GateTimingEntity convertToGateTimingEntity(GateTimingParam gateTimingParam,GateEntity gate){
        GateTimingEntity gateTimingEntity=new GateTimingEntity();
        gateTimingEntity.setGate(gate);
        gateTimingEntity.setDayOfWeek(gateTimingParam.getDayOfWeek());
        gateTimingEntity.setOpeningTime(gateTimingParam.getOpeningTime());
        gateTimingEntity.setClosingTime(gateTimingParam.getClosingTime());
        gateTimingEntity.setSex(gateTimingParam.getSex());
        gateTimingEntity.setPrice(gateTimingParam.getPrice());
        gateTimingEntity.setDeleted(false);
        return gateTimingEntity;

    }

    public static GateTimingDto convertToGateTimingDto(GateTimingEntity gateTimingEntity){
        GateTimingDto gateTimingDto=new GateTimingDto();
        gateTimingDto.setSex(gateTimingEntity.getSex());
        gateTimingDto.setDayOfWeek(gateTimingEntity.getDayOfWeek());
        gateTimingDto.setOpeningTime(gateTimingEntity.getOpeningTime());
        gateTimingDto.setClosingTime(gateTimingEntity.getClosingTime());
        gateTimingDto.setPrice(gateTimingEntity.getPrice());
        return gateTimingDto;
    }

//    public static PlanGateEntity convertToGateEntity(PlanGateParam planGateParam){
//        PlanGateEntity planGateEntity=new PlanGateEntity();
//        planGateEntity.setTitle(planGateParam.getTitle());
//        planGateEntity.setDescription(planGateParam.getDescription());
//        planGateEntity.setGate(GympinContext.getBean(GateServiceImpl.class).getEntityById(planGateParam.getGate().getId()));
//        planGateEntity.setGateTimings(planGateParam.getGateTimings().stream().map(t->GympinContext.getBean().getEntityById()));
//    }

    public static PlanGateDto convertToPlanGateDto(PlanGateEntity planGateEntity){
        PlanGateDto planGateDto=new PlanGateDto();
        planGateDto.setTitle(planGateEntity.getTitle());
        planGateDto.setDescription(planGateEntity.getDescription());
        planGateDto.setGate(convertToDto(planGateEntity.getGate()));
        planGateDto.setGateTimings(planGateEntity.getGateTimings().stream().map(GateConvertor::convertToGateTimingDto).collect(Collectors.toList()));
        planGateDto.setEntryCount(planGateEntity.getEntryCount());
        planGateDto.setPrice(planGateEntity.getPrice());
        planGateDto.setDiscountPrice(planGateEntity.getDiscountPrice());
        return planGateDto;
    }

//    public static GateEntity convertToGateEntity(GateParam gateParam){
//
//        GympinContext.getBean(UserServiceImpl.class).getEntityById();
//
//        GateEntity gateEntity=new GateEntity();
//        gateEntity.setName(gateParam.getName());
//        gateEntity.setPlace(GympinContext.getBean(PlaceServiceImpl.class).getEntityById(gateParam.getId()));
//        gateEntity.setSport(GympinContext.getBean(SportServiceImpl.class).getEntityById(gateParam.getSport().getId()));
//
//    }

}
