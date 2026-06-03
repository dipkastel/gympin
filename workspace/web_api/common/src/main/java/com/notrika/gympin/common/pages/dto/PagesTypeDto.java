package com.notrika.gympin.common.pages.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.dto.BaseDto;
import com.notrika.gympin.common.pages.enums.PagesElementsEnum;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@ToString
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class PagesTypeDto extends BaseDto<PagesTypeDto> {

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
