package com.notrika.gympin.common.finance.affiliate.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.finance.affiliate.enums.AffiliatorStatus;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.util.ApplicationEnum;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreateUpdate;
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
public class AffiliateDto extends BaseDtoWithCreateUpdate<AffiliateDto> {



    @JsonProperty("User")
    private UserDto user;

    @JsonProperty("AffiliatorStatus")
    private AffiliatorStatus affiliatorStatus;

    @JsonProperty("Income")
    private BigDecimal income;

    @JsonProperty("CommissionFee")
    private Double commissionFee;

    @JsonProperty("Username")
    private String username;

    @JsonProperty("CorporateCount")
    private Integer corporateCount = 0;

    @JsonProperty("PlaceCount")
    private Integer placeCount = 0;

}
