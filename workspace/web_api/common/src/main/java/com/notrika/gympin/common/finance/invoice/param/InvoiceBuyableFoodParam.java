package com.notrika.gympin.common.finance.invoice.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.corporate.corporate.param.CorporateParam;
import com.notrika.gympin.common.ticket.buyable.param.TicketBuyableParam;
import com.notrika.gympin.common.ticket.ticketFood.param.TicketFoodMenuParam;
import com.notrika.gympin.common.util._base.param.BaseParam;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.sql.Date;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class InvoiceBuyableFoodParam extends BaseParam<InvoiceBuyableFoodParam> {


    @JsonProperty("Invoice")
    private InvoiceParam invoice;

    @JsonProperty("MenuItem")
    private TicketFoodMenuParam menu;

    @JsonProperty("Count")
    private Short count;

    @JsonProperty("Corporate")
    private CorporateParam corporate;

}
