package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.context.GympinContext;
import com.notrika.gympin.common.context.GympinContextHolder;
import com.notrika.gympin.common.plan.dto.PlanDto;
import com.notrika.gympin.common.plan.dto.PlanGateDto;
import com.notrika.gympin.common.plan.dto.PlanRegisterDto;
import com.notrika.gympin.common.plan.param.PlanParam;
import com.notrika.gympin.common.plan.param.PlanRegisterParam;
import com.notrika.gympin.domain.plan.PlanServiceImpl;
import com.notrika.gympin.domain.util.helper.GeneralHelper;
import com.notrika.gympin.persistence.entity.plan.PlanEntity;
import com.notrika.gympin.persistence.entity.plan.PlanGateEntity;
import com.notrika.gympin.persistence.entity.plan.PlanRegisterEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class PlanConvertor {

    public static PlanEntity convertToPlanEntity(PlanParam planParam) {
        PlanEntity entity = new PlanEntity();
        entity.setName(planParam.getName());
        return entity;
    }

    public static PlanDto convertToPlanDto(PlanEntity entity) {
        PlanDto dto = new PlanDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        return dto;
    }

    public static PlanGateDto convertToPlanGateDto(PlanGateEntity entity) {
        PlanGateDto dto = new PlanGateDto();
        dto.setId(entity.getId());
        //        dto.setPlan(convertToPlanDto(entity.getPlan()));
        dto.setGate(GateConvertor.convertToDto(entity.getGate()));
        dto.setEntryCount(entity.getEntryCount());
        return dto;
    }

    public static PlanRegisterEntity convertToPlanRegisterEntity(PlanRegisterParam param) {
        PlanRegisterEntity entity = new PlanRegisterEntity();
        entity.setId(param.getId());
        entity.setUser((UserEntity) GympinContextHolder.getContext().getEntry().get(GympinContext.USER_KEY));
//        entity.setPlan(GympinContext.getBean(PlanServiceImpl.class).getEntityById(param.getPlan().getId()));
        entity.setRegisterDate(new Date());
        entity.setExpireDate(GeneralHelper.calcDateByDiff(entity.getRegisterDate(), param.getLength(), Calendar.MONTH));
//        entity.setLength(param.getLength());
        return entity;
    }

    public static PlanRegisterDto convertToPlanRegisterDto(PlanRegisterEntity entity) {
        PlanRegisterDto dto = new PlanRegisterDto();
        dto.setId(entity.getId());
//        dto.setPlan(convertToPlanDto(entity.getPlan()));
        dto.setRegisterDate(dto.getRegisterDate());
        dto.setExpireDate(dto.getExpireDate());
//        dto.setLength(entity.getLength());
        dto.setExpired(entity.getExpireDate().before(new Date()));
        return dto;
    }

    public static List<PlanGateDto> convertToPlanGateDto(List<PlanGateEntity> entities){
        return entities.stream().map(PlanConvertor::convertToPlanGateDto).collect(Collectors.toList());
    }

}
