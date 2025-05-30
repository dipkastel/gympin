package com.notrika.gympin.common.ticket.ticketFood.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.place.placeBase.dto.PlaceDto;
import com.notrika.gympin.common.place.placeCatering.dto.PlaceCateringDto;
import com.notrika.gympin.common.place.placeCatering.param.PlaceCateringParam;
import com.notrika.gympin.common.ticket.ticketFood.enums.FoodItemStatus;
import com.notrika.gympin.common.ticket.ticketFood.param.TicketFoodParam;
import com.notrika.gympin.common.util._base.dto.BaseDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class TicketFoodMenuDto extends BaseDto<TicketFoodMenuDto> {

    @JsonProperty(value = "Catering", required = true)
    private PlaceCateringDto catering;

    @JsonProperty(value = "Food", required = true)
    private TicketFoodDto food;

    @JsonProperty(value = "Date", required = true)
    private Date date;

    @JsonProperty("MinOrderCount")
    private Short minOrderCount;

    @JsonProperty("MaxOrderCount")
    private Short maxOrderCount;

    @JsonProperty("Category")
    private String category;

    @JsonProperty("FoodItemStatus")
    private FoodItemStatus foodItemStatus;



}
