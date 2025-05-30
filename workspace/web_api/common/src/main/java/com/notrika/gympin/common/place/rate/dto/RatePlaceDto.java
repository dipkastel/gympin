package com.notrika.gympin.common.place.rate.dto;

import com.notrika.gympin.common.util._base.dto.BaseDto;
import com.notrika.gympin.common.place.placeGym.dto.PlaceGymDto;
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
public class RatePlaceDto extends BaseDto<RatePlaceDto> {

    private PlaceGymDto place;

    private Float rate;

}
