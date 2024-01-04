package com.notrika.gympin.common.purchased.purchasedSubscribe.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.finance.serial.dto.SerialDto;
import com.notrika.gympin.common.purchased.purchasedSubscribe.enums.PurchasedStatus;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreateUpdate;
import com.notrika.gympin.common.ticket.ticketSubscribe.dto.TicketSubscribeDto;
import com.notrika.gympin.common.user.user.dto.UserDto;
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
public class PurchasedSubscribeDto extends BaseDtoWithCreateUpdate<PurchasedSubscribeDto> {

    @JsonProperty("Status")
    private PurchasedStatus status;

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

    @JsonProperty("EntryTotalCount")
    private Short entryTotalCount;

    @JsonProperty("TicketSubscribeExpireDate")
    private Date ticketSubscribeExpireDate;

    @JsonProperty("ExpireDate")
    private Date expireDate;

    @JsonProperty("EntryList")
    private List<PurchasedSubscribeEntryDto> entryList;


}
