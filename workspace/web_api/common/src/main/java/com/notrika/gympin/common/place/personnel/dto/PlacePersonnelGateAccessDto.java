package com.notrika.gympin.common.place.personnel.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.dto.BaseDto;
import com.notrika.gympin.common.gate.dto.GateDto;
import com.notrika.gympin.common.place.personnel.enums.PlacePersonnelAccessEnum;
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
public class PlacePersonnelGateAccessDto extends BaseDto<PlacePersonnelGateAccessDto> {

    @JsonProperty("PlacePersonelId")
    private Long placePersonelId;

    @JsonProperty("Gate")
    private GateDto gate;

    @JsonProperty("Access")
    private Boolean access;
}
