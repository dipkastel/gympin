package com.notrika.gympin.common.finance.serial.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelCreditDto;
import com.notrika.gympin.common.finance.IncreaseCorporateDeposit.dto.FinanceIncreaseCorporateDepositDto;
import com.notrika.gympin.common.finance.IncreaseUserDeposit.dto.FinanceIncreaseUserDepositDto;
import com.notrika.gympin.common.finance.invoice.dto.InvoiceDto;
import com.notrika.gympin.common.finance.serial.enums.ProcessTypeEnum;
import com.notrika.gympin.common.finance.transaction.dto.*;
import com.notrika.gympin.common.purchased.purchased.dto.PurchasedDto;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreateUpdate;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class SerialDto extends BaseDtoWithCreateUpdate<SerialDto> {

    @JsonProperty("Serial")
    private String serial;
    @JsonProperty("ProcessType")
    private ProcessTypeEnum processType;

    //transaction
    @JsonProperty("UserTransactions")
    private List<UserTransactionDto> userTransactions;
    @JsonProperty("CorporateTransactions")
    private List<CorporateTransactionDto> corporateTransactions;
    @JsonProperty("PersonnelCreditTransactions")
    private List<TransactionPersonnelCreditDto> personnelCreditTransactions;
    @JsonProperty("IncomeTransactions")
    private List<IncomeTransactionDto> incomeTransactions;
    @JsonProperty("DiscountTransactions")
    private List<DiscountTransactionDto> discountTransactions;
    @JsonProperty("UserIncreaseRequest")
    private List<FinanceIncreaseUserDepositDto> userIncreaseRequest;
    @JsonProperty("CorporateIncreaseRequest")
    private List<FinanceIncreaseCorporateDepositDto> CorporateIncreaseRequest;
    @JsonProperty("Invoices")
    private List<InvoiceDto> invoices;
    @JsonProperty("PurchasedBases")
    private List<PurchasedDto> purchasedBases;

}
