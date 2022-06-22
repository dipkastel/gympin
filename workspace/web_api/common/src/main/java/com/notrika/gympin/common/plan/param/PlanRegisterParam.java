package com.notrika.gympin.common.plan.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseParam;
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
public class PlanRegisterParam extends BaseParam<PlanRegisterParam> {

    @JsonProperty(value = "plan", required = true)
    private PlanParam plan;

    @JsonProperty(value = "length", required = true)
    private Integer length;

}
