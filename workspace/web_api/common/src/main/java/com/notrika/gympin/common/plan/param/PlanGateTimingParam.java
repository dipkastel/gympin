package com.notrika.gympin.common.plan.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.param.BaseParam;
import com.notrika.gympin.common.gate.param.GateTimingParam;
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
public class PlanGateTimingParam extends BaseParam<PlanGateTimingParam> {

    @JsonProperty(value = "plan")
    private PlanParam plan;

    @JsonProperty(value = "gateTiming", required = true)
    private GateTimingParam gateTiming;

    @JsonProperty(value = "entry-count", required = true)
    private Short entryCount;

}
