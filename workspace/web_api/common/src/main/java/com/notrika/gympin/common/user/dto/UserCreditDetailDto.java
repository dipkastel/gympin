package com.notrika.gympin.common.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.dto.BaseDto;
import com.notrika.gympin.common.corporate.corporate.dto.CorporateDto;
import com.notrika.gympin.common.user.enums.CreditType;
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
public class UserCreditDetailDto extends BaseDto<UserCreditDetailDto> {

    @JsonProperty("CreditType")
    private CreditType creditType;

    @JsonProperty("PersonnelId")
    private Long personnelId;

    @JsonProperty("Corporate")
    private CorporateDto corporate;

    @JsonProperty("CreditAmount")
    private BigDecimal creditAmount;

    @JsonProperty("CreditPayableAmount")
    private BigDecimal creditPayableAmount;
}
