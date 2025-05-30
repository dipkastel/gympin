package com.notrika.gympin.common.user.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.corporate.corporate.enums.CorporateContractTypeEnum;
import com.notrika.gympin.common.corporate.corporatePersonnel.enums.CorporatePersonnelCreditStatusEnum;
import com.notrika.gympin.common.place.placeGym.dto.PlaceGymDto;
import com.notrika.gympin.common.util._base.dto.BaseDto;
import com.notrika.gympin.common.corporate.corporate.dto.CorporateDto;
import com.notrika.gympin.common.user.user.enums.CreditType;
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
public class UserCreditDetailDto extends BaseDto<UserCreditDetailDto> {

    @JsonProperty("Name")
    private String name;

    @JsonProperty("CreditType")
    private CreditType creditType;

    @JsonProperty("CreditStatus")
    private CorporatePersonnelCreditStatusEnum creditStatus;

    @JsonProperty("PersonnelId")
    private Long personnelId;

    @JsonProperty("ContractType")
    private CorporateContractTypeEnum contractType;

    @JsonProperty("Corporate")
    private CorporateDto corporate;

    @JsonProperty("Place")
    private PlaceGymDto place;

    @JsonProperty("CreditAmount")
    private BigDecimal creditAmount;

    @JsonProperty("ExpireDate")
    private Date expireDate;

    @JsonProperty("CreditPayableAmount")
    private BigDecimal creditPayableAmount;
}
