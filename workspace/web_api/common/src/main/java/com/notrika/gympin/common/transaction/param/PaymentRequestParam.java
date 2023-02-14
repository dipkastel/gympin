package com.notrika.gympin.common.transaction.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.param.BaseParam;
import com.notrika.gympin.common.transaction.enums.TransactionType;
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
public class PaymentRequestParam extends BaseParam<PaymentRequestParam> {


    @JsonProperty("SelectedPaymentId")
    private Long selectedPaymentType;

    @JsonProperty("TransactionType")
    private TransactionType transactionType;

    @JsonProperty("Amount")
    private BigDecimal amount;

    @JsonProperty("CorporateId")
    private Long corporateId;

    @JsonProperty("PlaceId")
    private Long placeId;

    @JsonProperty("UserId")
    private Long UserId;


}
