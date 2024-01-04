package com.notrika.gympin.common.finance.transaction.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.param.BaseParam;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.List;

@Data
@SuperBuilder
@AllArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class FinanceCorporateParam extends BaseParam<FinanceCorporateParam> {


    @JsonProperty("TotalDeposit")
    private BigDecimal totalDeposit;

    @JsonProperty("TotalCreadit")
    private BigDecimal totalCreadit;

    @JsonProperty("UserTransactions")
    private List<UserTransactionParam> userTransactions;



}
