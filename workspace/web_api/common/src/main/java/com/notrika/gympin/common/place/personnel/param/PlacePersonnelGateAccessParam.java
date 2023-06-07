package com.notrika.gympin.common.place.personnel.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.param.BaseParam;
import com.notrika.gympin.common.gate.param.GateParam;
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
public class PlacePersonnelGateAccessParam extends BaseParam<PlacePersonnelGateAccessParam> {

    @JsonProperty("PlacePersonelId")
    private Long placePersonelId;

    @JsonProperty("gate")
    private GateParam gate;

    @JsonProperty("Access")
    private Boolean access;


}
