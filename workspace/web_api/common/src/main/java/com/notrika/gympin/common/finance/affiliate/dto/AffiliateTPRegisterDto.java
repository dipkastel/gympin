package com.notrika.gympin.common.finance.affiliate.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreateUpdate;
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
public class AffiliateTPRegisterDto  {



    @JsonProperty("UserPhoneNumber")
    private String userPhoneNumber;

    @JsonProperty("CorporateName")
    private String corporateName;

    @JsonProperty("UserTotalCredit")
    private BigDecimal userTotalCredit;



}
