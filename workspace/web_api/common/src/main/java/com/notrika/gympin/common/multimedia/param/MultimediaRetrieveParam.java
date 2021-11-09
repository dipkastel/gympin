package com.notrika.gympin.common.multimedia.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseParam;
import com.notrika.gympin.common.multimedia.enums.MediaType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class MultimediaRetrieveParam extends BaseParam<MultimediaStoreParam> {

    @JsonProperty("FileName")
    private String fileName;

    @JsonProperty("Height")
    private Integer height;

    @JsonProperty("Width")
    private Integer width;

    @JsonProperty("Type")
    private MediaType mediaType;

}
