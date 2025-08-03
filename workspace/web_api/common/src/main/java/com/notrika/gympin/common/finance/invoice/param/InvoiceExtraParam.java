package com.notrika.gympin.common.finance.invoice.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.place.personnel.dto.PlacePersonnelDto;
import com.notrika.gympin.common.place.placeBase.dto.PlaceDto;
import com.notrika.gympin.common.ticket.buyable.param.TicketBuyableParam;
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
public class InvoiceExtraParam extends BaseParam<InvoiceExtraParam> {


    @JsonProperty("Name")
    private String name;

    @JsonProperty("Invoice")
    private InvoiceParam invoice;

    @JsonProperty("Description")
    private String description;

    @JsonProperty("PlacePrice")
    private BigDecimal placePrice;

    @JsonProperty("Place")
    private PlaceDto place;

    @JsonProperty("Beneficiary")
    private PlacePersonnelDto beneficiary;

    @JsonProperty("UnitPrice")
    private BigDecimal unitPrice;

    @JsonProperty("Count")
    private Short count;

    @JsonProperty("PlacePersonelId")
    private Long placePersonelId;
}
