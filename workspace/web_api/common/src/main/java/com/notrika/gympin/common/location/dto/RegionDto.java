package com.notrika.gympin.common.location.dto;

import com.notrika.gympin.common.BaseDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class RegionDto extends BaseDto<RegionDto> {
    private Long id;
    private String name;
    private CityDto city;
    //private Collection<PlaceDto> places;

}
