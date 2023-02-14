package com.notrika.gympin.common.gate.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.param.BaseParam;
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
public class GateTrafficParam extends BaseParam<GateTrafficParam> {

    @JsonProperty(value = "Gate", required = true)
    private GateParam gate;


    @JsonProperty(value = "Traffic", required = true)
    private Short traffic;


}
