package com.notrika.gympin.common.ticket.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.param.BaseParam;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class TicketCheckoutParam extends BaseParam<TicketCheckoutParam> {

    @JsonProperty("Ticket")
    private TicketParam ticket;

    @JsonProperty("Price")
    private BigDecimal price;

    @JsonProperty("Checkout")
    private List<CheckoutDetailParam> checkout;


}
