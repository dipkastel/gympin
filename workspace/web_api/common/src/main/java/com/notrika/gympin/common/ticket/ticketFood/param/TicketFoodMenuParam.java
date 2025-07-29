package com.notrika.gympin.common.ticket.ticketFood.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.place.placeCatering.param.PlaceCateringParam;
import com.notrika.gympin.common.ticket.ticketFood.enums.FoodItemStatus;
import com.notrika.gympin.common.util._base.param.BaseParam;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.sql.Date;


@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class TicketFoodMenuParam extends BaseParam<TicketFoodMenuParam> {

    @JsonProperty(value = "Catering", required = true)
    private PlaceCateringParam catering;

    @JsonProperty(value = "Food", required = true)
    private TicketFoodParam food;

    @JsonProperty(value = "Date", required = true)
    private Date date;

    @JsonProperty("Category")
    private String category;

    @JsonProperty("Status")
    private FoodItemStatus foodItemStatus;



}
