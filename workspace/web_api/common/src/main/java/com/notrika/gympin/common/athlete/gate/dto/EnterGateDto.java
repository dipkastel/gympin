package com.notrika.gympin.common.athlete.gate.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseDto;
import com.notrika.gympin.common.location.dto.GateDto;
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
public class EnterGateDto extends BaseDto<EnterGateDto> {

    @JsonProperty(value = "reference-id")
    private String referenceId;

    @JsonProperty(value = "gate")
    private GateDto gate;

}
