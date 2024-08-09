package com.notrika.gympin.common.corporate.corporate.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.corporate.corporate.enums.CorporateContractTypeEnum;
import com.notrika.gympin.common.finance.transaction.dto.FinanceCorporateDto;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreateUpdate;
import com.notrika.gympin.common.corporate.corporate.enums.CorporateStatusEnum;
import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
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
public class CorporateDto extends BaseDtoWithCreateUpdate<CorporateDto> {

    @JsonProperty("Name")
    private String name;

    @JsonProperty("Address")
    private String address;

    @JsonProperty("FinanceCorporate")
    private FinanceCorporateDto financeCorporate;

    @JsonProperty("Status")
    private CorporateStatusEnum status;

    @JsonProperty("ContractType")
    private CorporateContractTypeEnum contractType;

    @JsonProperty("StepPeyment")
    private Boolean stepPeyment;

    @JsonProperty("ContractDate")
    private Date contractDate;

    @JsonProperty("ContractExpireDate")
    private Date contractExpireDate;

    @JsonProperty("DefaultExpireDuration")
    private short defaultExpireDuration;

    @JsonProperty("Logo")
    private MultimediaDto logo;


}
