package com.notrika.gympin.common.ticket.buyable.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
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
public class TicketDiscountHistoryDto extends BaseDtoWithCreateUpdate<TicketDiscountHistoryDto> {

    @JsonProperty("Discount")
    private Short Discount;

    @JsonProperty("afterPrice")
    private BigDecimal afterPrice;

    @JsonProperty("beforPrice")
    private BigDecimal beforPrice;

}