package com.notrika.gympin.common.finance.transaction.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.param.BaseParam;
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
public class CheckPaymentParam extends BaseParam<CheckPaymentParam> {

    @JsonProperty("Serial")
    private String serial;

    @JsonProperty("Accept")
    private Boolean accept;

    @JsonProperty("Description")
    private String Description;


}
