package com.notrika.gympin.common.ticket.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.param.BaseParam;
import com.notrika.gympin.common.user.enums.CreditType;
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
public class CheckoutDetailParam extends BaseParam<CheckoutDetailParam> {

    @JsonProperty("CreditType")
    private CreditType creditType;

    @JsonProperty("PersonnelId")
    private Long personnelId;

    @JsonProperty("Priority")
    private Long priority;

    @JsonProperty("Amount")
    private BigDecimal amount;


}
