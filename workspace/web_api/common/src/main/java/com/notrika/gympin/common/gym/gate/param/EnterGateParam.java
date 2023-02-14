package com.notrika.gympin.common.gym.gate.param;

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
public class EnterGateParam extends BaseParam<EnterGateParam> {

    @JsonProperty(value = "reference-id")
    private String referenceId;
//
//    @JsonProperty(value = "enter-status", required = true)
//    private EnterGateStatus enterStatus;

    @JsonProperty(value = "notes")
    private String notes;

}
