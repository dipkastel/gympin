package com.notrika.gympin.common.finance.suggest.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util.ApplicationEnum;
import com.notrika.gympin.common.util._base.param.BaseParam;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

@Data
@SuperBuilder
@AllArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class SuggestParam extends BaseParam<SuggestParam> {

    @JsonProperty("Application")
    private ApplicationEnum application;

    @JsonProperty("Amount")
    private BigDecimal amount;

    @JsonProperty("Priority")
    private Short priority;

}
