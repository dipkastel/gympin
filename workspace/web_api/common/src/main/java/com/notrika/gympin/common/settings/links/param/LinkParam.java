package com.notrika.gympin.common.settings.links.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.param.BaseParam;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class LinkParam extends BaseParam<LinkParam> {


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
