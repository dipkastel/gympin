package com.notrika.gympin.common.sportplace.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseDtoWithCreateUpdate;
import com.notrika.gympin.common.location.dto.PlaceDto;
import com.notrika.gympin.common.sport.dto.SportDto;
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
public class SportPlaceDto extends BaseDtoWithCreateUpdate<SportPlaceDto> {

    @JsonProperty("place")
    private PlaceDto place;

    @JsonProperty("sport")
    private SportDto sport;
}
