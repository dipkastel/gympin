package com.notrika.gympin.common.settings.tag.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.settings.tag.enums.TagTypes;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreateUpdate;
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
public class TagDto extends BaseDtoWithCreateUpdate<TagDto> {


    @JsonProperty("Name")
    private String name;

    @JsonProperty("Priority")
    private Short priority;

    @JsonProperty("PlaceCount")
    private Long placeCount;

    @JsonProperty("TagType")
    private TagTypes tagTypes;

}
