package com.notrika.gympin.common.location.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseDtoWithCreateUpdate;
import com.notrika.gympin.common.location.enums.DayOfWeek;
import com.notrika.gympin.common.user.enums.Sex;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.sql.Time;
import java.time.LocalTime;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class GateTimingDto extends BaseDtoWithCreateUpdate<GateTimingDto> {

    @JsonProperty(value = "sex")
    private Sex sex;

    @JsonProperty(value = "day-of-week")
    private DayOfWeek dayOfWeek;

    @JsonProperty(value = "opening-time")
    private LocalTime openingTime;

    @JsonProperty(value = "closing-time")
    private LocalTime closingTime;

    @JsonProperty(value = "price")
    private BigDecimal price;

}
