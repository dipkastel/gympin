package com.notrika.gympin.common.plan.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseParam;
import com.notrika.gympin.common.location.param.GateParam;
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
public class PlanGateParam extends BaseParam<PlanGateParam> {

    @JsonProperty(value = "plan", required = true)
    private PlanParam plan;

    @JsonProperty(value = "gate", required = true)
    private GateParam gate;

    @JsonProperty(value = "entry-count", required = true)
    private Short entryCount;


}
