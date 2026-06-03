package com.notrika.gympin.common.pages.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.pages.enums.PagesDestinationsEnum;
import com.notrika.gympin.common.util._base.dto.BaseDto;
import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
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
public class PagesDeadendDto extends BaseDto<PagesDeadendDto> {

    @JsonProperty("multimedia")
    private MultimediaDto multimedia;

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
    private String viewType;

    @JsonProperty("Priority")
    private Integer priority;

    @JsonProperty("Type")
    private String type;

    @JsonProperty("Parent")
    private PagesDeadendDto parent;


}
