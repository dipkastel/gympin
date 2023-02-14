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

@Data
@ToString
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class HomePageDestinationDto extends BaseDto<HomePageDestinationDto> {

    @JsonProperty("Name")
    private String name;

    @JsonProperty("Description")
    private String description;


}
