package com.notrika.gympin.common.user.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.dto.BaseDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class UserCreditDto extends BaseDto<UserCreditDto> {

    @JsonProperty("CreditDetails")
    private List<UserCreditDetailDto> creditDetail = new ArrayList<>();

    @JsonProperty("TotalCredit")
    private BigDecimal totalCredit ;

    @JsonProperty("PaymentUrl")
    private String PaymentUrl;
}
