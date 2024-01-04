package com.notrika.gympin.common.place.qrMessage.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.param.BaseParam;
import com.notrika.gympin.common.place.place.param.PlaceParam;
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
public class PlaceQrMessageParam extends BaseParam<PlaceQrMessageParam> {


    @JsonProperty("Text")
    private String text;

    @JsonProperty("ReplaceText")
    private String replaceText;

    @JsonProperty("Place")
    private PlaceParam place;


}
