package com.notrika.gympin.common.finance.invoice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.corporate.corporate.dto.CorporateDto;
import com.notrika.gympin.common.corporate.corporate.enums.CorporateContractTypeEnum;
import com.notrika.gympin.common.corporate.corporatePersonnel.enums.CorporatePersonnelCreditStatusEnum;
import com.notrika.gympin.common.user.user.dto.UserCreditDetailDto;
import com.notrika.gympin.common.user.user.enums.CreditType;
import com.notrika.gympin.common.util._base.dto.BaseDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class UserHowToPayDto extends BaseDto<UserHowToPayDto> {

    @JsonProperty("CreditDetails")
    private List<UserCreditDetailDto> creditDetail = new ArrayList<>();

    @JsonProperty("TotalCredit")
    private BigDecimal totalCredit ;

    @JsonProperty("CreditCover")
    private Boolean creditCovrage;

    @JsonProperty("PaymentUrl")
    private String PaymentUrl;
}
