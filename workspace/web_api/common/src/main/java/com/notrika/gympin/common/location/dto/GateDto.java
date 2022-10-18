package com.notrika.gympin.common.location.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseDtoWithCreateUpdate;
import com.notrika.gympin.common.location.param.GateTimingParam;
import com.notrika.gympin.common.sport.dto.SportDto;
import com.notrika.gympin.common.user.dto.UserDto;
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
public class GateDto extends BaseDtoWithCreateUpdate<GateDto> {

    @JsonProperty(value = "name")
    private String name;

    @JsonProperty(value = "place")
    private PlaceDto place;

    @JsonProperty(value = "sport")
    private SportDto sport;

    @JsonProperty(value = "guard")
    private List<UserDto> guard;

    @JsonProperty(value = "owner")
    private List<UserDto> owner;

    @JsonProperty(value = "gate-timing")
    private List<GateTimingParam> gateTimings;

    @JsonProperty("about-gate")
    private String aboutGate;

    @JsonProperty("gate-rules")
    private String gateRules;

}
