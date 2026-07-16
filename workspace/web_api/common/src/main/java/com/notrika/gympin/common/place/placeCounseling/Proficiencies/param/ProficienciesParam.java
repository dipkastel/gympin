package com.notrika.gympin.common.place.placeCounseling.Proficiencies.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.param.BaseParam;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class ProficienciesParam extends BaseParam<ProficienciesParam> {

    @JsonProperty("Name")
    private String name;

    @JsonProperty("PictureIds")
    private List<Long> pictureIds;

}
