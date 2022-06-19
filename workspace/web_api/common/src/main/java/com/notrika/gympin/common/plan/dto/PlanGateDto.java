package com.notrika.gympin.common.plan.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseDto;
import com.notrika.gympin.common.location.dto.GateDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class PlanGateDto extends BaseDto<PlanGateDto> {

    @JsonProperty("plan")
    private PlanDto plan;

    @JsonProperty("gate")
    private GateDto gate;

    @JsonProperty("entry-count")
    private Short entryCount;

}
