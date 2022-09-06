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
import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class GateParam extends BaseParam<GateParam> {

    @JsonProperty(value = "name", required = true)
    private String name;

    @JsonProperty(value = "place", required = true)
    private PlaceParam place;

    @JsonProperty(value = "sport", required = true)
    private SportParam sport;

    @JsonProperty(value = "guard", required = true)
    private List<UserParam> guard;

    @JsonProperty(value = "owner")
    private UserParam owner;

    @JsonProperty(value = "gate-timing")
    private List<GateTimingParam> gateTimings;

    @JsonProperty("about-gate")
    private String aboutGate;

    @JsonProperty("gate-rules")
    private String gateRules;

}
