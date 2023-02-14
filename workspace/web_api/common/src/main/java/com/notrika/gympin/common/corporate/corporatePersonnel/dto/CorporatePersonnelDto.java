package com.notrika.gympin.common.corporate.corporatePersonnel.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.dto.BaseDto;
import com.notrika.gympin.common.corporate.corporate.dto.CorporateDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.enums.CorporatePersonnelRoleEnum;
import com.notrika.gympin.common.user.dto.UserDto;
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
public class CorporatePersonnelDto extends BaseDto<CorporatePersonnelDto> {

    @JsonProperty("Corporate")
    private CorporateDto corporate;

    @JsonProperty("User")
    private UserDto user;

    @JsonProperty("Role")
    private CorporatePersonnelRoleEnum role;

    @JsonProperty("CreditBalance")
    private BigDecimal creditBalance;

    @JsonProperty("CreditList")
    private List<CorporatePersonnelCreditDto> creditList;
}
