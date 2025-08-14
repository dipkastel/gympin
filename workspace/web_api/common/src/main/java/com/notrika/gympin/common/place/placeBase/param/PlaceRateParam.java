package com.notrika.gympin.common.place.placeBase.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.place.placeBase.enums.PlaceCommentStatusEnum;
import com.notrika.gympin.common.util._base.param.BaseParam;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymParam;
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
public class PlaceRateParam extends BaseParam<PlaceRateParam> {

    @JsonProperty("Rate")
    private Double rate;

    @JsonProperty("PlaceId")
    private Long placeId;

    @JsonProperty("UserId")
    private Long userId;


}
