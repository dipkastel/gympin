package com.notrika.gympin.common.multimedia.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.dto.BaseDto;
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
public class MultimediaCategoryDto extends BaseDto<MultimediaCategoryDto> {

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
