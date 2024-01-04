package com.notrika.gympin.common.finance.transaction.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.finance.serial.dto.SerialDto;
import com.notrika.gympin.common.purchased.purchased.dto.PurchasedDto;
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
public class DiscountTransactionDto extends BaseDtoWithCreateUpdate<DiscountTransactionDto> {

    @JsonProperty("Amount")
    private BigDecimal amount;

    @JsonProperty("LatestBalance")
    private BigDecimal latestBalance;

    @JsonProperty("Serial")
    private SerialDto serial;

    @JsonProperty("IsChecked")
    private Boolean isChecked;

    @JsonProperty("Description")
    private String description;

    @JsonProperty("Purchased")
    private PurchasedDto purchased;




}
