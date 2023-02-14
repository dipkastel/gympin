package com.notrika.gympin.common.gympin.homePage.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.param.BaseParam;
import com.notrika.gympin.common.gympin.homePage.enums.HomePageDestination;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.Set;

@Data
@ToString
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@NoArgsConstructor
public class HomePageItemParam extends BaseParam<HomePageItemParam> {

    @JsonProperty("ImageId")
    private Long imageId;

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
    private HomePageItemParam parent;

    @JsonProperty("Items")
    private Set<HomePageItemParam> items;
}
