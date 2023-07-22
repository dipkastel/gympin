package com.notrika.gympin.common.gateway.parsian.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.param.BaseParam;
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
public class GatewayCallbackParam  {

    @JsonProperty(value = "Token")
    private Long Token;
    @JsonProperty(value = "OrderId")
    private Long OrderId;
    @JsonProperty(value = "TerminalNo")
    private Integer TerminalNo;
    @JsonProperty(value = "RRN")
    private Long RRN;
    @JsonProperty(value = "status")
    private Short status;
    @JsonProperty(value = "Amount")
    private String Amount;
    @JsonProperty(value = "SwAmount")
    private String SwAmount;
    @JsonProperty(value = "HashCardNumber")
    private String HashCardNumber;

}
