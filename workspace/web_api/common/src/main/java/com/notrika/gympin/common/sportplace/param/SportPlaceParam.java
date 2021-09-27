package com.notrika.gympin.common.sportplace.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseParam;
import com.notrika.gympin.common.location.param.PlaceParam;
import com.notrika.gympin.common.sport.param.SportParam;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class SportPlaceParam extends BaseParam<SportPlaceParam> {

    @JsonProperty("place")
    private PlaceParam place;

    @JsonProperty("sport")
    private SportParam sport;

}
