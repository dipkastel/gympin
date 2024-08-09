package com.notrika.gympin.common.purchased.purchasedSubscribe.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.finance.serial.dto.SerialDto;
import com.notrika.gympin.common.purchased.purchasedSubscribe.enums.SubscribePurchasedStatus;
import com.notrika.gympin.common.ticket.ticketSubscribe.dto.TicketSubscribeDto;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreateUpdate;
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
public class PurchasedSubscribeScannedDto extends BaseDtoWithCreateUpdate<PurchasedSubscribeScannedDto> {

    @JsonProperty("Status")
    private SubscribePurchasedStatus status;

    @JsonProperty("TicketSubscribe")
    private TicketSubscribeDto ticketSubscribe;

    @JsonProperty("User")
    private UserDto user;

    @JsonProperty("Name")
    private String name;


    @JsonProperty("Serial")
    private SerialDto serial;

    @JsonProperty("Price")
    private BigDecimal price;

    @JsonProperty("PlacePrice")
    private BigDecimal placePrice;

    @JsonProperty("Description")
    private String description;

    @JsonProperty("Timing")
    private String timing;

    @JsonProperty("EntryTotalCount")
    private Short entryTotalCount;

    @JsonProperty("UserEntryCount")
    private Integer userEntryCount;

    @JsonProperty("TicketSubscribeExpireDate")
    private Date TicketSubscribeExpireDate;

    @JsonProperty("ExpireDate")
    private Date expireDate;

    @JsonProperty("Entry")
    private PurchasedSubscribeEntryDto subscribeEntry;


}
