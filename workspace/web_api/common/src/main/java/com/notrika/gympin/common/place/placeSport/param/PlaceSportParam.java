package com.notrika.gympin.common.place.placeSport.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymParam;
import com.notrika.gympin.common.util._base.param.BaseParam;
import com.notrika.gympin.common.sport.sport.param.SportParam;
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
public class PlaceSportParam extends BaseParam<PlaceSportParam> {

    @JsonProperty("place")
    private PlaceGymParam place;

    @JsonProperty("sport")
    private SportParam sport;

}
