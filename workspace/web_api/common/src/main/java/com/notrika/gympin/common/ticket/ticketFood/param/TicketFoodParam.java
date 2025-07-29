package com.notrika.gympin.common.ticket.ticketFood.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.place.placeCatering.param.PlaceCateringParam;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymParam;
import com.notrika.gympin.common.ticket.ticketSubscribe.enums.SubscribeStatus;
import com.notrika.gympin.common.user.user.enums.Gender;
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
public class TicketFoodParam extends BaseParam<TicketFoodParam> {

    @JsonProperty(value = "Name", required = true)
    private String name;

    @JsonProperty("ValuePrice")
    private BigDecimal valuePrice;

    @JsonProperty("PlacePrice")
    private BigDecimal placePrice;

    @JsonProperty("Enable")
    private Boolean enable;

    @JsonProperty("IsCount")
    private Boolean isCount;

    @JsonProperty("Description")
    private String description;

    @JsonProperty(value = "Place", required = true)
    private PlaceCateringParam place;

    @JsonProperty("MinOrderCount")
    private Short minOrderCount;

    @JsonProperty("MaxOrderCount")
    private Short maxOrderCount;




}
