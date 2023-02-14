package com.notrika.gympin.common.gympin.homePage.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.dto.BaseDto;
import com.notrika.gympin.common.gympin.homePage.enums.HomePageDestination;
import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.Set;

@Data
@ToString
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class HomePageItemDto extends BaseDto<HomePageItemDto> {

    @JsonProperty("multimedia")
    private MultimediaDto multimedia;

    @JsonProperty("Title")
    private String title;

    @JsonProperty("Description")
    private String description;

    @JsonProperty("Destination")
    private HomePageDestination destination;

    @JsonProperty("Data")
    private String data;

    @JsonProperty("Priority")
    private Integer priority;

    @JsonProperty("Type")
    private String type;

    @JsonProperty("Parent")
    private HomePageItemDto parent;

    @JsonProperty("Items")
    private Set<HomePageItemDto> items;

}
