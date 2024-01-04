package com.notrika.gympin.common.multimedia.param;

import com.fasterxml.jackson.annotation.JsonProperty;
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
public class MultimediaCategoryParam extends BaseParam<MultimediaCategoryParam> {

    @JsonProperty("Name")
    private String name;
    @JsonProperty("ARW")
    private Integer arw;
    @JsonProperty("ARH")
    private Integer arh;
    @JsonProperty("MINW")
    private Integer minw;
    @JsonProperty("MINH")
    private Integer minh;
    @JsonProperty("MAXW")
    private Integer maxw;
    @JsonProperty("MAXH")
    private Integer maxh;

}
