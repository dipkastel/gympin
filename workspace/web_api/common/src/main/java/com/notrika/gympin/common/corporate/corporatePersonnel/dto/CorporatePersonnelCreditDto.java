package com.notrika.gympin.common.corporate.corporatePersonnel.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.dto.BaseDtoWithCreateUpdate;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
public class CorporatePersonnelCreditDto extends BaseDtoWithCreateUpdate<CorporatePersonnelCreditDto> {

    @JsonProperty("CorporatePersonnel")
    private CorporatePersonnelDto personnel;

    @JsonProperty("CreditAmount")
    private BigDecimal creditAmount;
}