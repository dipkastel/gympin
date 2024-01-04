package com.notrika.gympin.common.finance.gateway.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.util.ApplicationEnum;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreateUpdate;
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
public class GatewayApplicationDto extends BaseDtoWithCreateUpdate<GatewayApplicationDto> {

    @JsonProperty("Application")
    private ApplicationEnum application;

    @JsonProperty("IsDefault")
    private Boolean isDefault;

    @JsonProperty("Gateway")
    private GatewaysDto gateway;

}
