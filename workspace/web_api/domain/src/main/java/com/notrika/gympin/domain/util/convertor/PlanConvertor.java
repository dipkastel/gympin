package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.plan.dto.PlanDto;
import com.notrika.gympin.common.plan.dto.PlanGateDto;
import com.notrika.gympin.common.plan.param.PlanParam;
import com.notrika.gympin.persistence.entity.plan.PlanEntity;
import com.notrika.gympin.persistence.entity.plan.PlanGateEntity;

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
        dto.setPlan(convertToPlanDto(entity.getPlan()));
        dto.setGate(GateConvertor.convertToDto(entity.getGate()));
        dto.setEntryCount(entity.getEntryCount());
        return dto;
    }

}
