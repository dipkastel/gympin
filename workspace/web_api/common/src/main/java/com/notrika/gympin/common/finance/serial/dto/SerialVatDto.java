package com.notrika.gympin.common.finance.serial.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.finance.IncreaseCorporateDeposit.dto.FinanceIncreaseCorporateDepositDto;
import com.notrika.gympin.common.finance.IncreaseUserDeposit.dto.FinanceIncreaseUserDepositDto;
import com.notrika.gympin.common.finance.invoice.dto.InvoiceDto;
import com.notrika.gympin.common.finance.serial.enums.ProcessTypeEnum;
import com.notrika.gympin.common.finance.settlement.dto.FinanceSettlementUserDepositDto;
import com.notrika.gympin.common.finance.transaction.dto.*;
import com.notrika.gympin.common.purchased.purchased.dto.PurchasedDto;
import com.notrika.gympin.common.user.user.dto.UserDto;
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
public class SerialVatDto extends BaseDtoWithCreateUpdate<SerialVatDto> {



    @JsonProperty("Customer")
    private UserDto customer;

    @JsonProperty("Serial")
    private String serial;

    @JsonProperty("TicketName")
    private String ticketName;

    @JsonProperty("PlaceName")
    private String placeName;

    @JsonProperty("PlacePrice")
    private BigDecimal placePrice;

    @JsonProperty("SellPrice")
    private BigDecimal sellPrice;

    @JsonProperty("BeneficiaryPayment")
    private BigDecimal beneficiaryPayment;

    @JsonProperty("Discount")
    private BigDecimal discount;

    @JsonProperty("CorporatePay")
    private BigDecimal corporatePay;

    @JsonProperty("UserPay")
    private BigDecimal userPay;

    @JsonProperty("CommissionFee")
    private Double commissionFee;

    @JsonProperty("Beneficiary")
    private UserDto beneficiary;

    @JsonProperty("CommissionAll")
    private BigDecimal commissionAll;

    @JsonProperty("CommissionByCorporate")
    private BigDecimal commissionByCorporate;

    @JsonProperty("CommissionByUser")
    private BigDecimal commissionByUser;

    @JsonProperty("NetIncomeByCorporate")
    private BigDecimal netIncomeByCorporate;

    @JsonProperty("NetIncomeByUser")
    private BigDecimal netIncomeByUser;

    @JsonProperty("VatByCorporate")
    private BigDecimal vatByCorporate;

    @JsonProperty("VatByUser")
    private BigDecimal vatByUser;

    @JsonProperty("Error")
    private String error;


}
