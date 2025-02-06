package com.notrika.gympin.common.settings.tag.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.settings.tag.enums.TagTypes;
import com.notrika.gympin.common.util._base.param.BaseParam;
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
public class TagParam extends BaseParam<TagParam> {

    @JsonProperty("Name")
    private String name;

    @JsonProperty("Priority")
    private Short priority;

    @JsonProperty("TagType")
    private TagTypes tagType;

    @JsonProperty("Place")
    private PlaceParam place;


}
