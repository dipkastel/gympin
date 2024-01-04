package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.finance.gateway.dto.GatewaysDto;
import com.notrika.gympin.common.finance.gateway.dto.GatewayApplicationDto;
import com.notrika.gympin.persistence.entity.finance.gateway.FinanceApplicationGatewayEntity;
import com.notrika.gympin.persistence.entity.finance.gateway.FinanceGatewayEntity;

public final class GatewayConvertor {

    public static GatewaysDto toDto(FinanceGatewayEntity entity) {
        GatewaysDto dto = new GatewaysDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setImage(MultimediaConvertor.toDto(entity.getGatewayImage()));
        dto.setGatewayType(entity.getGatewayType());
        dto.setDescription(entity.getDescription());
        dto.setPassword(entity.getPassword());
        dto.setToken(entity.getToken());
        dto.setSerial(entity.getSerial());
        dto.setData1(entity.getData1());
        dto.setData2(entity.getData2());
        dto.setData3(entity.getData3());
        return dto;
    }


    public static GatewaysDto toSimpleDto(FinanceGatewayEntity entity) {
        GatewaysDto dto = new GatewaysDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setImage(MultimediaConvertor.toDto(entity.getGatewayImage()));
        dto.setGatewayType(entity.getGatewayType());
        dto.setDescription(entity.getDescription());
        return dto;
    }


    public static GatewayApplicationDto toDto(FinanceApplicationGatewayEntity entity) {
        GatewayApplicationDto dto = new GatewayApplicationDto();
        dto.setId(entity.getId());
        dto.setApplication(entity.getApplication());
        dto.setIsDefault(entity.getIsDefault());
        dto.setGateway(toSimpleDto(entity.getGateway()));
        return dto;
    }



//    public static GatewaysDto toDto(FinanceGatewayEntity entity) {
//        GatewaysDto dto = new GatewaysDto();
//        dto.setId(entity.getId());
//        dto.setName(entity.getName());
//        dto.setImage(MultimediaConvertor.toDto(entity.getGatewayImage()));
//        dto.setIsDefault(entity.getIsDefault());
//        dto.setGatewayType(entity.getGateway().getGatewayType());
//        dto.setDescription(entity.getGateway().getDescription());
//        return dto;
//    }


}
