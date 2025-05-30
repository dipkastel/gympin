package com.notrika.gympin.common.finance.affiliate.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymParam;
import com.notrika.gympin.common.util._base.param.BaseParam;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@ToString
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class AffiliateAddPlaceParam extends BaseParam<AffiliateAddPlaceParam> {

    @JsonProperty("Place")
    private PlaceGymParam place;

}
