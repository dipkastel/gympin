package com.notrika.gympin.common.android.gympin.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class MainPageChildItemDto extends BaseDto<MainPageChildItemDto> {

    @JsonProperty("imageUrl")
    String imageUrl;

    @JsonProperty("title")
    String title;

    @JsonProperty("description")
    String description;

    @JsonProperty("destination")
    MainPageChildItemDestinationDto destination;

    @JsonProperty("data")
    String data;

    @JsonProperty("priority")
    Integer priority;



}
