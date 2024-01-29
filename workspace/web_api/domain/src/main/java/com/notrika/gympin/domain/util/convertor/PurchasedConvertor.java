package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.purchased.purchased.dto.PurchasedDto;
import com.notrika.gympin.persistence.entity.purchased.PurchasedBaseEntity;
import com.notrika.gympin.persistence.entity.purchased.purchasedCourse.PurchasedCourseEntity;
import com.notrika.gympin.persistence.entity.purchased.purchasedSubscribe.PurchasedSubscribeEntity;

public final class PurchasedConvertor {



    public static PurchasedDto ToDto(PurchasedBaseEntity entity) {
        if (entity == null) return null;
        PurchasedDto dto = new PurchasedDto();
        dto.setPlace(PlaceConvertor.toDtoSecure(entity.getPlace()));
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setCustomer(UserConvertor.toDtoSimple(entity.getCustomer()));
        dto.setPlacePrice(entity.getPlacePrice());
        dto.setDiscount(entity.getDiscount());
        dto.setPurchasedType(entity.getPurchasedType());
        dto.setSellPrice(entity.getSellPrice());
        dto.setSerial(SerialConvertor.ToDto(entity.getSerial()));
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
