package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.place.personnel.dto.PlacePersonnelBuyableAccessDto;
import com.notrika.gympin.common.purchased.purchased.dto.PurchasedDto;
import com.notrika.gympin.common.ticket.buyable.dto.TicketBuyableDto;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonelBuyableAccessEntity;
import com.notrika.gympin.persistence.entity.purchased.PurchasedBaseEntity;

import java.util.List;
import java.util.stream.Collectors;

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
        dto.setStatus(entity.getStatus());
        return dto;
    }


}
