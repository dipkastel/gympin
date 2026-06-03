package com.notrika.gympin.common.pages.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.pages.enums.PagesDestinationsEnum;
import com.notrika.gympin.common.util._base.param.BaseParam;
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
public class PagesItemParam extends BaseParam<PagesItemParam> {

    @JsonProperty("ImageId")
    private Long imageId;

    @JsonProperty("Title")
    private String title;

    @JsonProperty("Description")
    private String description;

    @JsonProperty("Destination")
    private PagesDestinationsEnum destination;

    @JsonProperty("Data")
    private String data;

    @JsonProperty("Url")
    private String url;

    @JsonProperty("ViewType")
    private String ViewType;

    @JsonProperty("Priority")
    private Integer priority = 0;

    @JsonProperty("Type")
    private String type;

    @JsonProperty("Parent")
    private PagesItemParam parent;

    @JsonProperty("Items")
    private Set<PagesItemParam> items;
}
