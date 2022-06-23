package com.notrika.gympin.common.location.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseDtoWithCreateUpdate;
import com.notrika.gympin.common.sport.dto.SportDto;
import com.notrika.gympin.common.user.dto.UserDto;
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
public class GateDto extends BaseDtoWithCreateUpdate<GateDto> {

    @JsonProperty(value = "name")
    private String name;

    @JsonProperty("opening-time")
    private Time openingTime;

    @JsonProperty("closing-time")
    private Time closingTime;

    @JsonProperty(value = "place")
    private PlaceDto place;

    @JsonProperty(value = "sport")
    private SportDto sport;

    @JsonProperty(value = "guard")
    private UserDto guard;

}
