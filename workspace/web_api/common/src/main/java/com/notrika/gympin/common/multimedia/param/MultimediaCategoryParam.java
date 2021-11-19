package com.notrika.gympin.common.multimedia.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseParam;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class MultimediaCategoryParam extends BaseParam<MultimediaCategoryParam> {

    @JsonProperty("Name")
    private String name;

}
