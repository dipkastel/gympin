package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.context.GympinContext;
import com.notrika.gympin.common.context.GympinContextHolder;
import com.notrika.gympin.common.plan.dto.PlanDto;
import com.notrika.gympin.common.plan.dto.PlanGateTimingDto;
import com.notrika.gympin.common.plan.dto.PlanRegisterDto;
import com.notrika.gympin.common.plan.param.PlanRegisterParam;
import com.notrika.gympin.common.sportplace.dto.SportPlaceDto;
import com.notrika.gympin.common.sportplace.param.SportPlaceParam;
import com.notrika.gympin.domain.util.helper.GeneralHelper;
import com.notrika.gympin.persistence.entity.plan.PlanEntity;
import com.notrika.gympin.persistence.entity.plan.PlanGateTimingEntity;
import com.notrika.gympin.persistence.entity.plan.PlanRegisterEntity;
import com.notrika.gympin.persistence.entity.sportplace.SportPlaceEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class PlanConvertor {

    public static PlanDto toDto(PlanEntity entity) {
        PlanDto dto = new PlanDto();
        dto.setPlace(PlaceConvertor.toDto(entity.getPlace()));
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setPrice(entity.getPrice());
        dto.setValuePrice(entity.getValuePrice());
        dto.setEnable(entity.getEnable());
        dto.setGender(entity.getGender());
        dto.setDescription(entity.getDescription());
        dto.setEntryTotalCount(entity.getEntryTotalCount());
        dto.setStartSellingDate(entity.getStartSellingDate());
        dto.setEndSellingDate(entity.getEndSellingDate());
        dto.setPlanExpireType(entity.getPlanExpireType());
        dto.setExpireDate(entity.getExpireDate());
        dto.setExpireDuration(entity.getExpireDuration());
        return dto;
    }

    public static PlanGateTimingDto convertToPlanGateDto(PlanGateTimingEntity entity) {
        PlanGateTimingDto dto = new PlanGateTimingDto();
        dto.setId(entity.getId());
        dto.setPlan(toDto(entity.getPlan()));
        dto.setGateTimings(GateConvertor.convertToGateTimingDto(entity.getGateTimings()));
        dto.setEntryCount(entity.getEntryCount());
        return dto;
    }

    public static PlanRegisterEntity convertToPlanRegisterEntity(PlanRegisterParam param) {
        PlanRegisterEntity entity = new PlanRegisterEntity();
        entity.setId(param.getId());
        entity.setUser((UserEntity) GympinContextHolder.getContext().getEntry().get(GympinContext.USER_KEY));
        entity.setRegisterDate(new Date());
        entity.setExpireDate(GeneralHelper.calcDateByDiff(entity.getRegisterDate(), param.getLength(), Calendar.MONTH));
        return entity;
    }

    public static PlanRegisterDto convertToPlanRegisterDto(PlanRegisterEntity entity) {
        PlanRegisterDto dto = new PlanRegisterDto();
        dto.setId(entity.getId());
        dto.setRegisterDate(dto.getRegisterDate());
        dto.setExpireDate(dto.getExpireDate());
        dto.setExpired(entity.getExpireDate().before(new Date()));
        return dto;
    }

}
