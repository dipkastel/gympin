package com.notrika.gympin.common.settings.links.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreateUpdate;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class LinkDto extends BaseDtoWithCreateUpdate<LinkDto> {

    @JsonProperty("IsActive")
    private Boolean isActive;

    @JsonProperty("Name")
    private String name;

    @JsonProperty("Code")
    private String code;

    @JsonProperty("Url")
    private String url;

    @JsonProperty("Value1")
    private String value1;

    @JsonProperty("Value2")
    private String value2;

    @JsonProperty("Value3")
    private String value3;

    @JsonProperty("Description")
    private String description;


}
