package com.notrika.gympin.common.place.place.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.param.BaseParam;
import com.notrika.gympin.common.multimedia.param.MultimediaRetrieveParam;
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
public class PlaceMultimediaParam extends BaseParam<PlaceMultimediaParam> {

    @JsonProperty("Place")
    private PlaceParam placeParam;

    @JsonProperty("Multimedia")
    private MultimediaRetrieveParam multimedia;
}
