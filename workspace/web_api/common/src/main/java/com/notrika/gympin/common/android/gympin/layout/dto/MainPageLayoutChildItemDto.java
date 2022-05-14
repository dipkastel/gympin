package com.notrika.gympin.common.android.gympin.layout.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseDto;
import com.notrika.gympin.common.android.gympin.layout.enums.MainPageChildItemDestination;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Data
@ToString
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class MainPageLayoutChildItemDto extends BaseDto<MainPageLayoutChildItemDto> {

    @JsonProperty("ImageUrl")
    private String imageUrl;

    @JsonProperty("Title")
    private String title;

    @JsonProperty("Description")
    private String description;

    @JsonProperty("Destination")
    private MainPageChildItemDestination destination;

    @JsonProperty("Data")
    private String data;

    @JsonProperty("Priority")
    private Integer priority;

}
