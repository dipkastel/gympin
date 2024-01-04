package com.notrika.gympin.common.finance.transaction.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.param.BaseParam;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.List;

@Data
@SuperBuilder
@AllArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class FinanceUserParam extends BaseParam<FinanceUserParam> {


    @JsonProperty("TotalDeposit")
    private BigDecimal totalDeposit;

    @JsonProperty("UserTransactions")
    private List<UserTransactionParam> userTransactions;



}
