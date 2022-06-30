package com.notrika.gympin.common.gym.gate.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseParam;
import com.notrika.gympin.common.athlete.gate.enums.EnterGateStatus;
import com.notrika.gympin.common.location.param.GateParam;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.UUID;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class EnterGateParam extends BaseParam<EnterGateParam> {

    @JsonProperty(value = "reference-id")
    private UUID referenceId;

    @JsonProperty(value = "enter-status", required = true)
    private EnterGateStatus enterStatus;

}
