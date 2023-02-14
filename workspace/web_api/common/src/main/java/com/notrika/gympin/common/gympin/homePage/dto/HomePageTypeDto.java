package com.notrika.gympin.common.gympin.homePage.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.dto.BaseDto;
import com.notrika.gympin.common.gympin.homePage.enums.HomePageElementsEnum;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.List;
import java.util.Map;

@Data
@ToString
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class HomePageTypeDto extends BaseDto<HomePageTypeDto> {

    @JsonProperty("Name")
    private String name;

    @JsonProperty("Type")
    private String type;

    @JsonProperty("Description")
    private String description;

    @JsonProperty("CanBeParent")
    private Boolean canBeParent;

    @JsonProperty("Elements")
    private List<HomePageElementsEnum> elements;


}
