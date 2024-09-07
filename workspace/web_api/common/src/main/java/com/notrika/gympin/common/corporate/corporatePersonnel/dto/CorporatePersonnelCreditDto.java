package com.notrika.gympin.common.corporate.corporatePersonnel.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.corporate.corporatePersonnel.enums.CorporatePersonnelCreditStatusEnum;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreateUpdate;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.Date;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
public class CorporatePersonnelCreditDto extends BaseDtoWithCreateUpdate<CorporatePersonnelCreditDto> {

    @JsonProperty("CorporatePersonnel")
    private CorporatePersonnelDto personnel;

    @JsonProperty("CreditAmount")
    private BigDecimal creditAmount;

    @JsonProperty("ExpireDate")
    private Date expireDate;

    @JsonProperty("Status")
    private CorporatePersonnelCreditStatusEnum status;


}
