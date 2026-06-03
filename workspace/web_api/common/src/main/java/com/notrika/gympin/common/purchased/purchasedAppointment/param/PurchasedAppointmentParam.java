package com.notrika.gympin.common.purchased.purchasedAppointment.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.purchased.purchasedAppointment.enums.AppointmentPurchasedStatus;
import com.notrika.gympin.common.ticket.ticketAppointment.param.TicketAppointmentParam;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.util._base.param.BaseParam;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.Date;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class PurchasedAppointmentParam extends BaseParam<PurchasedAppointmentParam> {

    @JsonProperty("Status")
    private AppointmentPurchasedStatus status;

    @JsonProperty("TicketAppointment")
    private TicketAppointmentParam ticketAppointment;

    @JsonProperty("User")
    private UserParam user;

    @JsonProperty("TicketAppointmentName")
    private String ticketAppointmentName;

    @JsonProperty("Price")
    private BigDecimal price;

    @JsonProperty("Description")
    private String description;

    @JsonProperty("EntryTotalCount")
    private Short entryTotalCount;

    @JsonProperty("AppointmentDate")
    private Date appointmentDate;

    @JsonProperty("ExpireDate")
    private Date expireDate;

}
