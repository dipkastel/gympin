package com.notrika.gympin.common.location.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseParam;
import com.notrika.gympin.common.sport.param.SportParam;
import com.notrika.gympin.common.user.param.UserParam;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.sql.Time;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
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

    @JsonProperty(value = "sport", required = true)
    private SportParam sport;

    @JsonProperty(value = "guard", required = true)
    private UserParam guard;

}
