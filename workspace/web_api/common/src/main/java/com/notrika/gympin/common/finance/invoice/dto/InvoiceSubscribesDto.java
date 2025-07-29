package com.notrika.gympin.common.finance.invoice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.place.personnel.dto.PlacePersonnelDto;
import com.notrika.gympin.common.place.placeBase.dto.PlaceDto;
import com.notrika.gympin.common.ticket.buyable.dto.TicketBuyableDto;
import com.notrika.gympin.common.ticket.buyable.enums.BuyableType;
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
public class InvoiceSubscribesDto extends BaseDtoWithCreateUpdate<InvoiceSubscribesDto> {

    @JsonProperty("Name")
    private String name;

    @JsonProperty("Description")
    private String description;

    @JsonProperty("Discount")
    private Short discount;

    @JsonProperty("PlacePrice")
    private BigDecimal placePrice;

    @JsonProperty("BuyableType")
    private BuyableType buyableType;

    @JsonProperty("Place")
    private PlaceDto place;

    @JsonProperty("Beneficiary")
    private PlacePersonnelDto beneficiary;

    @JsonProperty("UnitPrice")
    private BigDecimal unitPrice;

    @JsonProperty("Count")
    private Short count;

    @JsonProperty("Gender")
    private Gender gender;

    @JsonProperty("Buyable")
    private TicketBuyableDto buyableDto;
}
