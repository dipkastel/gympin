package com.notrika.gympin.common.transaction.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.param.BaseParam;
import com.notrika.gympin.common.util.ApplicationEnum;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class PaymentGatewaysParam extends BaseParam<PaymentGatewaysParam> {
    @JsonProperty("Application")
    private ApplicationEnum application;
}
