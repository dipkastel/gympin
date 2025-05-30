package com.notrika.gympin.common.place.placeGym.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.param.BaseParam;
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
public class PlaceGymMultimediaParam extends BaseParam<PlaceGymMultimediaParam> {

    @JsonProperty("Place")
    private PlaceGymParam placeParam;

    @JsonProperty("Multimedia")
    private MultimediaRetrieveParam multimedia;
}
