package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.finance.serial.dto.SerialDto;
import com.notrika.gympin.common.purchased.purchased.dto.PurchasedDto;
import com.notrika.gympin.persistence.entity.finance.FinanceSerialEntity;
import com.notrika.gympin.persistence.entity.purchased.PurchasedBaseEntity;
import com.notrika.gympin.persistence.entity.purchased.purchasedCourse.PurchasedCourseEntity;
import com.notrika.gympin.persistence.entity.purchased.purchasedSubscribe.PurchasedSubscribeEntity;

import java.util.List;
import java.util.stream.Collectors;

public final class PurchasedConvertor {
    public static PurchasedDto ToDto(PurchasedBaseEntity entity) {
        if (entity == null) return null;
        PurchasedDto dto = new PurchasedDto();
        dto.setPlace(PlaceConvertor.ToDto(entity.getPlace()));
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setKey(entity.getKey());
        dto.setCustomer(UserConvertor.toDtoSimple(entity.getCustomer()));
        dto.setPlacePrice(entity.getPlacePrice());
        dto.setDiscount(entity.getDiscount());
        dto.setPurchasedType(entity.getPurchasedType());
        dto.setSellPrice(entity.getSellPrice());
        try {
            dto.setSerials((List<SerialDto>) entity.getSerials().stream().map(serial -> SerialConvertor.ToDto((FinanceSerialEntity) serial)).collect(Collectors.toList()));
        }catch (Exception e){}
        dto.setGender(entity.getGender());
        dto.setDescription(entity.getDescription());
        try{
          dto.setPurchasedStatus(((PurchasedCourseEntity)entity).getStatus().toString());
        }catch (Exception e){}
        try{
          dto.setPurchasedStatus(((PurchasedSubscribeEntity)entity).getStatus().toString());
        }catch (Exception e){}
        return dto;
    }


}
