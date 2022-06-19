package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.context.GympinContext;
import com.notrika.gympin.common.location.dto.GateDto;
import com.notrika.gympin.common.location.param.GateParam;
import com.notrika.gympin.domain.location.PlaceServiceImpl;
import com.notrika.gympin.persistence.entity.location.GateEntity;

public final class GateConvertor {

    public static GateEntity convertToEntity(GateParam gateParam) {
        GateEntity gateEntity = new GateEntity();
        gateEntity.setName(gateParam.getName());
        gateEntity.setOpeningTime(gateParam.getOpeningTime());
        gateEntity.setPlace(GympinContext.getBean(PlaceServiceImpl.class).getEntityById(gateParam.getId()));
        return gateEntity;
    }

    public static GateDto convertToDto(GateEntity entity){
        GateDto gateDto = new GateDto();
        gateDto.setName(entity.getName());
        gateDto.setOpeningTime(entity.getOpeningTime());
        gateDto.setClosingTime(entity.getClosingTime());
        gateDto.setPlace(LocationConvertor.placeToPlaceDto(entity.getPlace()));
        return gateDto;
    }

}
