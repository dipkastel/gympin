package com.notrika.gympin.common.plan.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.dto.BaseDto;
import com.notrika.gympin.common._base.dto.BaseDtoWithCreateUpdate;
import com.notrika.gympin.common.place.place.dto.PlaceDto;
import com.notrika.gympin.common.user.enums.Gender;
import com.notrika.gympin.common.user.enums.PlanExpireType;
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
public class PlanDiscountHistoryDto extends BaseDtoWithCreateUpdate<PlanDiscountHistoryDto> {

    @JsonProperty("Discount")
    private Short Discount;

    @JsonProperty("afterPrice")
    private BigDecimal afterPrice;

    @JsonProperty("beforPrice")
    private BigDecimal beforPrice;

}
