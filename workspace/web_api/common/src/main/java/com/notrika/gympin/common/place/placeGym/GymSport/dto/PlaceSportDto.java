package com.notrika.gympin.common.place.placeGym.GymSport.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.place.placeGym.Gym.dto.PlaceGymDto;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreateUpdate;
import com.notrika.gympin.common.place.placeGym.sport.dto.SportDto;
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
public class PlaceSportDto extends BaseDtoWithCreateUpdate<PlaceSportDto> {

    @JsonProperty("place")
    private PlaceGymDto place;

    @JsonProperty("sport")
    private SportDto sport;
}
