package com.notrika.gympin.common.place.rate.param;

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
public class RatePlaceParam extends BaseParam<RatePlaceParam> {

    private PlaceParam place;

    private Float rate;

}
