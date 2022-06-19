package com.notrika.gympin.common.plan.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseParam;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class PlanParam extends BaseParam<PlanParam> {

    @JsonProperty(value = "name", required = true)
    private String name;

}
