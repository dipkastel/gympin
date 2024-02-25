package com.notrika.gympin.common.finance.invoice.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.finance.invoice.enums.InvoiceStatus;
import com.notrika.gympin.common.user.user.param.UserParam;
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
public class InvoiceParam extends BaseParam<InvoiceParam> {

    @JsonProperty("User")
    private UserParam user;

    @JsonProperty("Status")
    private InvoiceStatus status;

}