package com.notrika.gympin.common.finance.settlement.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.param.BaseParam;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

@Data
@SuperBuilder
@AllArgsConstructor
@ToString
public class FinanceSettlementUserDepositParam extends BaseParam<FinanceSettlementUserDepositParam> {

        @JsonProperty("UserId")
        Long userID;

        @JsonProperty("Amount")
        BigDecimal amount;

        @JsonProperty("Description")
        String description;

        @JsonProperty("Accept")
        Boolean accept;

}
