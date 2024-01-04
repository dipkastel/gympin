package com.notrika.gympin.common.finance.serial.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelCreditDto;
import com.notrika.gympin.common.finance.IncreaseUserDeposit.dto.FinanceIncreaseUserDepositDto;
import com.notrika.gympin.common.finance.invoice.dto.InvoiceDto;
import com.notrika.gympin.common.finance.transaction.dto.CorporateTransactionDto;
import com.notrika.gympin.common.finance.transaction.dto.DiscountTransactionDto;
import com.notrika.gympin.common.finance.transaction.dto.IncomeTransactionDto;
import com.notrika.gympin.common.finance.transaction.dto.UserTransactionDto;
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
public class CompleteSerialDto extends BaseDtoWithCreateUpdate<CompleteSerialDto> {

    @JsonProperty("Serial")
    private String serial;
    @JsonProperty("UserTransactions")
    private List<UserTransactionDto> userTransactions;
    @JsonProperty("CorporateTransactions")
    private List<CorporateTransactionDto> corporateTransactions;
    @JsonProperty("PersonnelPays")
    private List<CorporatePersonnelCreditDto> personnelPays;
    @JsonProperty("IncomeTransactions")
    private List<IncomeTransactionDto> incomeTransactions;
    @JsonProperty("DiscountTransactions")
    private List<DiscountTransactionDto> discountTransactions;
    @JsonProperty("Increases")
    private List<FinanceIncreaseUserDepositDto> increases;
    @JsonProperty("Invoices")
    private List<InvoiceDto> invoices;
    @JsonProperty("PurchasedBases")
    private List<PurchasedDto> purchasedBases;

}
