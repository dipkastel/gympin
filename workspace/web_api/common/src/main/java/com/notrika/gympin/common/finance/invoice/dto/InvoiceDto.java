package com.notrika.gympin.common.finance.invoice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.finance.invoice.enums.InvoiceStatus;
import com.notrika.gympin.common.finance.serial.dto.SerialDto;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.user.user.enums.Gender;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreateUpdate;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class InvoiceDto extends BaseDtoWithCreateUpdate<InvoiceDto> {

    @JsonProperty("User")
    private UserDto user;

    @JsonProperty("Serial")
    private SerialDto serial;

    @JsonProperty("Status")
    private InvoiceStatus status;

    @JsonProperty("UserFullName")
    private String userFullName;

    @JsonProperty("UserPhoneNumber")
    private String userPhonNumber;

    @JsonProperty("Gender")
    private Gender gender;

    @JsonProperty("NationalCode")
    private String nationalCode;

    @JsonProperty("TotalPrice")
    private BigDecimal totalPrice;

    @JsonProperty("PriceToPay")
    private BigDecimal priceToPay;

    @JsonProperty("InvoiceBuyables")
    private List<InvoiceBuyableDto> invoiceBuyables;
}
