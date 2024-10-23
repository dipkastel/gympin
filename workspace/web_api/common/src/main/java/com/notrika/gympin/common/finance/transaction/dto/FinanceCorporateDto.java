package com.notrika.gympin.common.finance.transaction.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.corporate.corporate.dto.CorporateDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelDto;
import com.notrika.gympin.common.finance.transaction.enums.TransactionStatus;
import com.notrika.gympin.common.finance.transaction.enums.TransactionType;
import com.notrika.gympin.common.place.place.dto.PlaceDto;
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
public class FinanceCorporateDto extends BaseDtoWithCreateUpdate<FinanceCorporateDto> {

    @JsonProperty("TotalDeposit")
    private BigDecimal totalDeposit;

    @JsonProperty("TotalCredits")
    private BigDecimal totalCredits;

    @JsonProperty("TransactionType")
    private List<CorporateTransactionDto> transactions;

    @JsonProperty("Corporate")
    private CorporateDto corporate;




}
