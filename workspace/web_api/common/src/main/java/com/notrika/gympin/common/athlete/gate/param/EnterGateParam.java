package com.notrika.gympin.common.athlete.gate.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.param.BaseParam;
import com.notrika.gympin.common.gate.param.GateParam;
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
public class EnterGateParam extends BaseParam<EnterGateParam> {

    @JsonProperty(value = "gate", required = true)
    private GateParam gate;

}
