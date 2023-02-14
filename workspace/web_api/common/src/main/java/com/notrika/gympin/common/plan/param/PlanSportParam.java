package com.notrika.gympin.common.plan.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.param.BaseParam;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.sportplace.param.SportPlaceParam;
import com.notrika.gympin.common.user.enums.Gender;
import com.notrika.gympin.common.user.enums.PlanExpireType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class PlanSportParam extends BaseParam<PlanSportParam> {

    @JsonProperty(value = "Plan", required = true)
    private PlanParam plan;


    @JsonProperty(value = "SportPlace", required = true)
    private List<SportPlaceParam> sportsPlace;
}
