package com.notrika.gympin.common.gate.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.dto.BaseDtoWithCreateUpdate;
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
public class GateTrafficDto extends BaseDtoWithCreateUpdate<GateTrafficDto> {

    @JsonProperty(value = "Gate")
    private GateDto gate;

    @JsonProperty(value = "Traffic")
    private Short traffic;


}
