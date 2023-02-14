package com.notrika.gympin.common.user.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

@Data
@SuperBuilder
@AllArgsConstructor
@ToString
public class PaymentParam {

        @JsonProperty("TransactionCode")
        String transactionCode;

        @JsonProperty("TransactionId")
        String transactionId;

        @JsonProperty("resultCode")
        String resultCode;


}
