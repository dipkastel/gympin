package com.notrika.gympin.common.ticket.ticketSubscribe.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.ticket.ticketSubscribe.enums.SubscribeStatus;
import com.notrika.gympin.common.util._base.param.BaseParam;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymParam;
import com.notrika.gympin.common.user.user.enums.Gender;
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
public class TicketSubscribeParam extends BaseParam<TicketSubscribeParam> {

    @JsonProperty(value = "Name", required = true)
    private String name;

    @JsonProperty("ValuePrice")
    private BigDecimal valuePrice;

    @JsonProperty("SubscribeStatus")
    private SubscribeStatus subscribeStatus;

    @JsonProperty("PlacePrice")
    private BigDecimal placePrice;

    @JsonProperty("Enable")
    private Boolean enable;

    @JsonProperty("Gender")
    private Gender gender;

    @JsonProperty("Description")
    private String description;

    @JsonProperty("Timing")
    private String timing;

    @JsonProperty(value = "Place", required = true)
    private PlaceGymParam place;

    @JsonProperty("EntryTotalCount")
    private Short entryTotalCount;

    @JsonProperty( "ExpireDuration")
    private Short expireDuration;

    @JsonProperty( "SubscribeCapacity")
    private Integer subscribeCapacity;


}
