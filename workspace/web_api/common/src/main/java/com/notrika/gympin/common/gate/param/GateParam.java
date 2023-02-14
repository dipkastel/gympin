package com.notrika.gympin.common.gate.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.param.BaseParam;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.sport.param.SportParam;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class GateParam extends BaseParam<GateParam> {

    @JsonProperty(value = "Name", required = true)
    private String name;

    @JsonProperty(value = "Place", required = true)
    private PlaceParam place;

    @JsonProperty(value = "Sport", required = true)
    private SportParam sport;

    @JsonProperty(value = "Enable")
    private Boolean enable;

    @JsonProperty(value = "TrafficManagement")
    private Boolean trafficManagement;

    @JsonProperty(value = "Gate-timing")
    private List<GateTimingParam> gateTimings;

}
