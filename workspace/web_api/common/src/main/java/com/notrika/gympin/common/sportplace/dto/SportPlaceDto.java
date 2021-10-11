package com.notrika.gympin.common.sportplace.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseDto;
import com.notrika.gympin.common.location.dto.PlaceDto;
import com.notrika.gympin.common.sport.dto.SportDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class SportPlaceDto extends BaseDto<SportPlaceDto> {

    @JsonProperty("place")
    private PlaceDto place;

    @JsonProperty("sport")
    private SportDto sport;
}
