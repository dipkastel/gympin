package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.ticket.ticketFood.dto.TicketFoodDto;
import com.notrika.gympin.common.ticket.ticketFood.dto.TicketFoodMenuDto;
import com.notrika.gympin.persistence.entity.place.PlaceCateringEntity;
import com.notrika.gympin.persistence.entity.ticket.food.TicketFoodItemEntity;
import com.notrika.gympin.persistence.entity.ticket.food.TicketFoodMenuEntity;

public class TicketFoodConvertor {

    public static TicketFoodDto toDto(TicketFoodItemEntity entity) {
        if (entity == null) return null;
        TicketFoodDto dto = new TicketFoodDto();
        dto.setPlace(PlaceConvertor.ToDto(entity.getPlace()));
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setPrice(entity.getPrice());
        dto.setValuePrice(entity.getValuePrice());
        dto.setPlacePrice(entity.getPlacePrice());
        dto.setDiscount(entity.getDiscount());
        dto.setEnable(entity.getEnable());
        dto.setIsCount(entity.getIsCount());
        dto.setMinOrderCount(entity.getMinOrderCount());
        dto.setMaxOrderCount(entity.getMaxOrderCount());
        dto.setDescription(entity.getDescription());
        dto.setCategory(entity.getCategory());
        try{
            dto.setMultimedias(MultimediaConvertor.toDto(entity.getMultimedias()));
        }catch (Exception e){}
        return dto;
    }

    public static TicketFoodMenuDto toDto(TicketFoodMenuEntity entity) {
        if (entity == null) return null;
        TicketFoodMenuDto dto = new TicketFoodMenuDto();
        dto.setCatering(PlaceConvertor.ToCateringDto((PlaceCateringEntity) entity.getFoodItem().getPlace()));
        dto.setFood(toDto(entity.getFoodItem()));
        dto.setId(entity.getId());
        dto.setDate(entity.getDate());
        dto.setFoodItemStatus(entity.getFoodItemStatus());
        dto.setCategory(entity.getCategory());
        return dto;
    }


}
