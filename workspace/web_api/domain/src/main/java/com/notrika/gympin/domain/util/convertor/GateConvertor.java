package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.context.GympinContext;
import com.notrika.gympin.common.location.dto.GateDto;
import com.notrika.gympin.common.location.param.GateParam;
import com.notrika.gympin.domain.location.PlaceServiceImpl;
import com.notrika.gympin.domain.sport.SportServiceImpl;
import com.notrika.gympin.domain.user.UserServiceImpl;
import com.notrika.gympin.persistence.entity.location.GateEntity;

import java.util.stream.Collectors;

public final class GateConvertor {

    public static GateEntity convertToEntity(GateParam gateParam) {
        GateEntity gateEntity = new GateEntity();
        gateEntity.setName(gateParam.getName());
        gateEntity.setOpeningTime(gateParam.getOpeningTime());
        gateEntity.setPlace(GympinContext.getBean(PlaceServiceImpl.class).getEntityById(gateParam.getPlace().getId()));
        gateEntity.setSport(GympinContext.getBean(SportServiceImpl.class).getEntityById(gateParam.getSport().getId()));
        gateEntity.setGuard(gateParam.getGuard().stream().map(g->GympinContext.getBean(UserServiceImpl.class).getEntityById(g.getId())).collect(Collectors.toList()));
//                GympinContext.getBean(UserServiceImpl.class).getEntityById(gateParam.getGuard().getId()));
        return gateEntity;
    }

    public static GateDto convertToDto(GateEntity entity) {
        GateDto gateDto = new GateDto();
        gateDto.setId(entity.getId());
        gateDto.setName(entity.getName());
        gateDto.setOpeningTime(entity.getOpeningTime());
        gateDto.setClosingTime(entity.getClosingTime());
        gateDto.setPlace(LocationConvertor.placeToPlaceDto(entity.getPlace()));
        gateDto.setSport(SportConvertor.sportToSportDto(entity.getSport()));
        gateDto.setGuard(entity.getGuard().stream().map(UserConvertor::userToUserDtoBrief).collect(Collectors.toList()));
//        UserConvertor.userToUserDtoBrief(entity.getGuard()));
        return gateDto;
    }

}
