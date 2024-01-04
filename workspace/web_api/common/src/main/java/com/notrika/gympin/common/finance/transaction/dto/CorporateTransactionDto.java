package com.notrika.gympin.common.finance.transaction.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.corporate.corporate.dto.CorporateDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelDto;
import com.notrika.gympin.common.finance.serial.dto.SerialDto;
import com.notrika.gympin.common.finance.transaction.enums.TransactionCorporateType;
import com.notrika.gympin.common.finance.transaction.enums.TransactionStatus;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreateUpdate;
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
public class CorporateTransactionDto extends BaseDtoWithCreateUpdate<CorporateTransactionDto> {

    @JsonProperty("Amount")
    private BigDecimal amount;

    @JsonProperty("TransactionStatus")
    private TransactionStatus transactionStatus;

    @JsonProperty("TransactionType")
    private TransactionCorporateType transactionCorporateType;

    @JsonProperty("LatestBalance")
    private BigDecimal latestBalance;

    @JsonProperty("Serial")
    private SerialDto serial;

    @JsonProperty("IsChecked")
    private Boolean isChecked;

    @JsonProperty("Description")
    private String description;

    @JsonProperty("CorporateFinance")
    private FinanceCorporateDto financeCorporate;

    @JsonProperty("CorporatePersonnel")
    private CorporatePersonnelDto corporatePersonnel;




}
