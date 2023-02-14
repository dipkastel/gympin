package com.notrika.gympin.common.sportplace.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.param.BaseParam;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.sport.param.SportParam;
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
public class SportPlaceParam extends BaseParam<SportPlaceParam> {

    @JsonProperty("place")
    private PlaceParam place;

    @JsonProperty("sport")
    private SportParam sport;

}
