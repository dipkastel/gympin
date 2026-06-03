package com.notrika.gympin.common.pages.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.param.BaseParam;
import com.notrika.gympin.common.pages.enums.PagesElementsEnum;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@ToString
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@NoArgsConstructor
public class PagesTypeParam extends BaseParam<PagesTypeParam> {

    @JsonProperty("Name")
    private String name;

    @JsonProperty("Type")
    private String type;

    @JsonProperty("Description")
    private String description;

    @JsonProperty("Parent")
    private Long parent;

    @JsonProperty("Elements")
    private List<PagesElementsEnum> elements;

}
