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
