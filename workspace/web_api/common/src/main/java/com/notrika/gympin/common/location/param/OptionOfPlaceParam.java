package com.notrika.gympin.common.location.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseParam;
import com.notrika.gympin.common.option.place.param.PlaceOptionParam;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class OptionOfPlaceParam extends BaseParam<OptionOfPlaceParam> {

    @JsonProperty("place")
    private PlaceParam placeParam;

    @JsonProperty("placeOption")
    private PlaceOptionParam placeOptionParam;
}
