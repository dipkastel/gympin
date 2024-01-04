package com.notrika.gympin.common.corporate.corporatePersonnel.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.param.BaseParam;
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
public class CorporatePersonnelCreditParam extends BaseParam<CorporatePersonnelCreditParam> {

    @JsonProperty("CorporatePersonnel")
    private CorporatePersonnelParam personnel;

    @JsonProperty("CorporateId")
    private Long corporateId;

    @JsonProperty("CreditAmount")
    private BigDecimal creditAmount;

    @JsonProperty("GroupId")
    private Long groupId;

}
