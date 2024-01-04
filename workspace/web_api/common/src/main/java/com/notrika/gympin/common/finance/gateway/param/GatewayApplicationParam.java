package com.notrika.gympin.common.finance.gateway.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util.ApplicationEnum;
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
public class GatewayApplicationParam extends BaseParam<GatewayApplicationParam> {

    @JsonProperty("Application")
    private ApplicationEnum application;

    @JsonProperty("IsDefault")
    private Boolean isDefault;

    @JsonProperty("Gateway")
    private GatewaysParam gateway;
}
