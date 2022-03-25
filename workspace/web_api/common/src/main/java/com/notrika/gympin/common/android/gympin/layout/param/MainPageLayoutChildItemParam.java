package com.notrika.gympin.common.android.gympin.layout.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseParam;
import com.notrika.gympin.common.android.gympin.layout.enums.MainPageChildItemDestination;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@NoArgsConstructor
public class MainPageLayoutChildItemParam extends BaseParam<MainPageLayoutChildItemParam> {

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
