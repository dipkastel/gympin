package com.notrika.gympin.common.finance.transaction.param;

import com.fasterxml.jackson.annotation.JsonProperty;
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
public class UserSettlementRequestParam extends BaseParam<UserSettlementRequestParam> {


    @JsonProperty("UserId")
    private Long userId;

    @JsonProperty("Amount")
    private BigDecimal amount;


}
