package com.notrika.gympin.common.corporate.corporatePersonnel.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.dto.BaseDto;
import com.notrika.gympin.common.corporate.corporate.dto.CorporateDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.enums.CorporatePersonnelRoleEnum;
import com.notrika.gympin.common.user.user.dto.UserDto;
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


    @JsonProperty("User")
    private UserDto user;

    @JsonProperty("Role")
    private CorporatePersonnelRoleEnum role;

    @JsonProperty("PersonnelGroup")
    private CorporatePersonnelGroupDto personnelGroup;

    @JsonProperty("CreditList")
    private List<CorporatePersonnelCreditDto> creditList;

    @JsonProperty("Corporate")
    private CorporateDto corporate;

    @JsonProperty("TotalCredit")
    private BigDecimal totalCredit;

    @JsonProperty("CateringsAccess")
    private List<Long> cateringAccess;
}
