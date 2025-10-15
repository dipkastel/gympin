package com.notrika.gympin.common.ticket.ticketFood.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.place.placeCatering.param.PlaceCateringParam;
import com.notrika.gympin.common.util._base.param.BaseParam;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class TicketFoodCategoryParam extends BaseParam<TicketFoodCategoryParam> {

    @JsonProperty(value = "Category")
    private String category;


}
