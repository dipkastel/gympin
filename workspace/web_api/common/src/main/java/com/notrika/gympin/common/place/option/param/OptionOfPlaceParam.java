package com.notrika.gympin.common.place.option.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.param.BaseParam;
import com.notrika.gympin.common.place.place.param.PlaceParam;
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
public class OptionOfPlaceParam extends BaseParam<OptionOfPlaceParam> {

    @JsonProperty("Place")
    private PlaceParam place;

    @JsonProperty("PlaceOption")
    private PlaceOptionParam placeOption;
}
