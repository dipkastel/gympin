package com.notrika.gympin.common.android.gympin.layout.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseDto;
import com.notrika.gympin.common.android.gympin.layout.enums.MainPageChildItemDestination;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class MainPageLayoutChildItemDto extends BaseDto<MainPageLayoutChildItemDto> {

    @JsonProperty("imageUrl")
    private String imageUrl;

    @JsonProperty("title")
    private String title;

    @JsonProperty("description")
    private String description;

    @JsonProperty("destination")
    private MainPageChildItemDestination destination;

    @JsonProperty("data")
    private String data;

    @JsonProperty("priority")
    private Integer priority;

}
