package com.notrika.gympin.common.ticket.ticketSubscribe.filter;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.query.BaseQuery;
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
public class TicketSubscribeFilter extends BaseQuery<TicketSubscribeFilter> {

    @JsonProperty("title")
    private String title;

    @JsonProperty("description")
    private String description;

    @JsonProperty(value = "entry-count-start")
    private Short entryCountStart;

    @JsonProperty(value = "entry-count-end")
    private Short entryCountEnd;

    @JsonProperty(value = "price-start")
    private BigDecimal priceStart;

    @JsonProperty(value = "price-end")
    private BigDecimal priceEnd;

    @JsonProperty(value = "discount-price-start")
    private BigDecimal discountPriceStart;

    @JsonProperty(value = "discount-price-end")
    private BigDecimal discountPriceEnd;

}
