package com.notrika.gympin.common.finance.invoice.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.ticket.buyable.param.TicketBuyableParam;
import com.notrika.gympin.common.util._base.param.BaseParam;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class InvoiceBuyableParam extends BaseParam<InvoiceBuyableParam> {


    @JsonProperty("Invoice")
    private InvoiceParam invoice;

    @JsonProperty("Buyable")
    private TicketBuyableParam buyable;

    @JsonProperty("Count")
    private Short count;

}
