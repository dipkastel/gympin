package com.notrika.gympin.common.ticket.ticketSubscribe.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.util._base.dto.BaseDto;
import com.notrika.gympin.common.place.place.dto.PlaceDto;
import com.notrika.gympin.common.user.user.enums.Gender;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class TicketSubscribeDto extends BaseDto<TicketSubscribeDto> {

    @JsonProperty("Name")
    private String name;

    @JsonProperty("Price")
    private BigDecimal price;

    @JsonProperty("ValuePrice")
    private BigDecimal valuePrice;

    @JsonProperty("PlacePrice")
    private BigDecimal placePrice;

    @JsonProperty("Discount")
    private Short discount;

    @JsonProperty("Enable")
    private Boolean enable;

    @JsonProperty("Gender")
    private Gender gender;

    @JsonProperty("Description")
    private String description;

    @JsonProperty("Timing")
    private String Timing;

    @JsonProperty("Coaches")
    private List<UserDto> coaches;

    @JsonProperty(value = "Place")
    private PlaceDto place;

    @JsonProperty("EntryTotalCount")
    private Short entryTotalCount;

    @JsonProperty( "ExpireDuration")
    private Short expireDuration;

    @JsonProperty( "SubscribeCapacity")
    private Integer subscribeCapacity;


}
