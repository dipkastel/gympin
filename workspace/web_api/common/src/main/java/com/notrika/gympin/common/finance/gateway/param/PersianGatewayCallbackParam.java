package com.notrika.gympin.common.finance.gateway.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
public class PersianGatewayCallbackParam {

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
