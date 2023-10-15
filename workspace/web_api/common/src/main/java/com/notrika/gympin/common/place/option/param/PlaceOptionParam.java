package com.notrika.gympin.common.place.option.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.param.BaseParam;
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
public class PlaceOptionParam extends BaseParam<PlaceOptionParam> {

    @JsonProperty("Name")
    private String name;

    @JsonProperty("Weight")
    private Short weight;
}
