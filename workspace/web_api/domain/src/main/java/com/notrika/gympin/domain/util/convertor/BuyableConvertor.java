package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.place.personnel.dto.PlacePersonnelBuyableAccessDto;
import com.notrika.gympin.common.ticket.buyable.dto.TicketBuyableDto;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonelBuyableAccessEntity;
import com.notrika.gympin.persistence.entity.ticket.BuyableEntity;

import java.util.List;
import java.util.stream.Collectors;

public final class BuyableConvertor {


    public static PlacePersonnelBuyableAccessDto ToDto(PlacePersonelBuyableAccessEntity entity) {
        if (entity == null) return null;
        return PlacePersonnelBuyableAccessDto.builder()
                .id(entity.getId())
                .isDeleted(entity.isDeleted())
                .buyableDto(ToDto(entity.getBuyable()))
                .access(entity.getAccess())
                .build();
    }

    public static TicketBuyableDto ToDto(BuyableEntity entity) {
        if (entity == null) return null;
        TicketBuyableDto dto = new TicketBuyableDto();
        dto.setPlace(PlaceConvertor.toDto(entity.getPlace()));
        dto.setBeneficiary(PlaceConvertor.personnelToDto(entity.getBeneficiary()));
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setPrice(entity.getPrice());
        dto.setValuePrice(entity.getValuePrice());
        dto.setPlacePrice(entity.getPlacePrice());
        dto.setDiscount(entity.getDiscount());
        dto.setBuyableType(entity.getBuyableType());
        dto.setEnable(entity.getEnable());
        dto.setGender(entity.getGender());
        dto.setDescription(entity.getDescription());
        return dto;
    }

    public static List<PlacePersonnelBuyableAccessDto> ToDto(List<PlacePersonelBuyableAccessEntity> entities) {
        if (entities == null) return null;
        return entities.stream().filter(o->!o.isDeleted()).map(BuyableConvertor::ToDto).collect(Collectors.toList());

    }

}
