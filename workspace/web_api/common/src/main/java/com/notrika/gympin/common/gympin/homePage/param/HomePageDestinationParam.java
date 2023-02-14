package com.notrika.gympin.common.gympin.homePage.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.param.BaseParam;
import com.notrika.gympin.common.gympin.homePage.enums.HomePageElementsEnum;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.List;

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
