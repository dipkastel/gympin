package com.notrika.gympin.common.ticket.ticketAppointment.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.place.placeCounseling.param.PlaceCounselingParam;
import com.notrika.gympin.common.ticket.ticketAppointment.enums.AppointmentStatus;
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
public class TicketAppointmentParam extends BaseParam<TicketAppointmentParam> {

    @JsonProperty(value = "Name", required = true)
    private String name;

    @JsonProperty("Price")
    private BigDecimal price;

    @JsonProperty("ValuePrice")
    private BigDecimal valuePrice;

    @JsonProperty("AppointmentStatus")
    private AppointmentStatus appointmentStatus;

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
    private PlaceCounselingParam place;

    @JsonProperty( "ExpireDuration")
    private Short expireDuration;

    @JsonProperty( "AppointmentCapacity")
    private Integer appointmentCapacity;


}
