package com.notrika.gympin.common.ticket.ticketAppointment.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.place.placeBase.dto.PlaceDto;
import com.notrika.gympin.common.ticket.ticketAppointment.enums.AppointmentStatus;
import com.notrika.gympin.common.user.user.enums.Gender;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreateUpdate;
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
public class TicketAppointmentDto extends BaseDtoWithCreateUpdate<TicketAppointmentDto> {

    @JsonProperty("Name")
    private String name;

    @JsonProperty("AppointmentStatus")
    private AppointmentStatus appointmentStatus;

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

    @JsonProperty(value = "Place")
    private PlaceDto place;

    @JsonProperty( "ExpireDuration")
    private Short expireDuration;

    @JsonProperty( "AppointmentCapacity")
    private Integer appointmentCapacity;


}
