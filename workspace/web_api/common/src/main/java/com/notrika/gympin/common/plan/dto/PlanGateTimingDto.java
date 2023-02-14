package com.notrika.gympin.common.plan.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.dto.BaseDto;
import com.notrika.gympin.common.gate.dto.GateTimingDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class PlanGateTimingDto extends BaseDto<PlanGateTimingDto> {

    @JsonProperty("plan")
    private PlanDto plan;

    @JsonProperty(value = "gate-timing")
    private GateTimingDto gateTimings;

    @JsonProperty(value = "entry-count")
    private Short entryCount;


}
