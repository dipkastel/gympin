package com.notrika.gympin.common.home.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.param.BaseParam;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Data
@ToString
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@NoArgsConstructor
public class HomePageDestinationParam extends BaseParam<HomePageDestinationParam> {

    @JsonProperty("Name")
    private String name;

    @JsonProperty("Description")
    private String description;
}
