package com.notrika.gympin.common.multimedia.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreateUpdate;
import com.notrika.gympin.common.multimedia.enums.MediaType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class MultimediaDto extends BaseDtoWithCreateUpdate<MultimediaDto> {

    @JsonProperty("Name")
    private String name;

    @JsonProperty("Media_type")
    private MediaType mediaType;

    @JsonProperty("Title")
    private String title;

    @JsonProperty("Description")
    private String description;

    @JsonProperty("DocumentFormat")
    private String documentFormat;

    @JsonProperty("Category")
    private MultimediaCategoryDto category;

    @JsonProperty("Url")
    private String url;

    @JsonProperty("default")
    private Boolean isDefault;

}
