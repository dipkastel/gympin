package com.notrika.gympin.common.finance.IncreaseCorporateDeposit.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.finance.gateway.param.GatewayApplicationParam;
import com.notrika.gympin.common.util.ApplicationEnum;
import com.notrika.gympin.common.util._base.param.BaseParam;
import com.notrika.gympin.common.finance.transaction.enums.TransactionType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.Date;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class RequestIncreaseCorporateDepositParam extends BaseParam<RequestIncreaseCorporateDepositParam> {


    @JsonProperty("GatewayApplication")
    private GatewayApplicationParam gatewayApplication;

    @JsonProperty("Application")
    private ApplicationEnum application;

    @JsonProperty("Amount")
    private BigDecimal amount;

    @JsonProperty("CorporateId")
    private Long corporateId;

    @JsonProperty("TransactionReference")
    private String transactionReference;

    @JsonProperty("ChequeDate")
    private Date chequeDate;

    @JsonProperty("Description")
    private String description;

    @JsonProperty("RequestInvoice")
    Boolean requestInvoice;

    @JsonProperty("Draft")
    Boolean draft;

}
