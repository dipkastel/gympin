package com.notrika.gympin.common.location.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseParam;
import com.notrika.gympin.common.location.enums.DayOfWeek;
import com.notrika.gympin.common.user.enums.Sex;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.sql.Time;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class GateTimingParam extends BaseParam<GateTimingParam> {

    @JsonProperty(value = "sex", required = true)
    private Sex sex;

    @JsonProperty(value = "day-of-week", required = true)
    private DayOfWeek dayOfWeek;

    @JsonProperty(value = "opening-time", required = true)
    private Time openingTime;

    @JsonProperty(value = "closing-time", required = true)
    private Time closingTime;

    @JsonProperty(value = "price")
    private BigDecimal price;

}
