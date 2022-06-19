package com.notrika.gympin.common.location.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseParam;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.sql.Time;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class GateParam extends BaseParam<GateParam> {

    @JsonProperty(value = "name", required = true)
    private String name;

    @JsonProperty("opening-time")
    private Time openingTime;

    @JsonProperty("closing-time")
    private Time closingTime;

    @JsonProperty(value = "place", required = true)
    private PlaceParam place;

}
