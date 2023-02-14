package com.notrika.gympin.common.rate.place.dto;

import com.notrika.gympin.common._base.dto.BaseDto;
import com.notrika.gympin.common.place.place.dto.PlaceDto;
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

    private PlaceDto place;

    private Float rate;

}
