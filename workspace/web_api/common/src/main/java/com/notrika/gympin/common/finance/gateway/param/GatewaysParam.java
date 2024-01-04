package com.notrika.gympin.common.finance.gateway.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.finance.transaction.enums.GatewayType;
import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.multimedia.param.MultimediaRetrieveParam;
import com.notrika.gympin.common.multimedia.param.MultimediaStoreParam;
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
public class GatewaysParam extends BaseParam<GatewaysParam> {

    @JsonProperty("Name")
    private String name;

    @JsonProperty("GatewayType")
    private GatewayType gatewayType;

    @JsonProperty("ImageId")
    private Long multimediaId;

    @JsonProperty("Description")
    private String description;

    @JsonProperty("Password")
    private String password;

    @JsonProperty( "Token")
    private String token;

    @JsonProperty( "Serial")
    private String serial;

    @JsonProperty( "Data1")
    private String data1;

    @JsonProperty( "Data2")
    private String data2;

    @JsonProperty( "Data3")
    private String data3;

}
