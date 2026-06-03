package com.notrika.gympin.common.purchased.purchasedAppointment.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.finance.serial.dto.SerialDto;
import com.notrika.gympin.common.purchased.purchasedAppointment.enums.AppointmentPurchasedStatus;
import com.notrika.gympin.common.ticket.ticketAppointment.dto.TicketAppointmentDto;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreateUpdate;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class PurchasedAppointmentDto extends BaseDtoWithCreateUpdate<PurchasedAppointmentDto> {

    @JsonProperty("Status")
    private AppointmentPurchasedStatus status;

    @JsonProperty("TicketAppointment")
    private TicketAppointmentDto ticketAppointment;

    @JsonProperty("User")
    private UserDto user;

    @JsonProperty("Name")
    private String name;

    @JsonProperty("Timing")
    private String timing;

    @JsonProperty("Serial")
    private List<SerialDto> serial;

    @JsonProperty("Price")
    private BigDecimal price;

    @JsonProperty("PlacePrice")
    private BigDecimal placePrice;

    @JsonProperty("Description")
    private String description;

    @JsonProperty("EntryTotalCount")
    private Short entryTotalCount;

    @JsonProperty("AppointmentDate")
    private Date AppointmentDate;

    @JsonProperty("ExpireDate")
    private Date expireDate;

    @JsonProperty("Key")
    private String key;

    @JsonProperty("UseExpire")
    private Boolean useExpire;

    @JsonProperty("UseExpireDate")
    private Date useExpireDate;

}
