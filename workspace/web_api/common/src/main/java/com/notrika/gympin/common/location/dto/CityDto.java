package com.notrika.gympin.common.location.dto;

import com.notrika.gympin.common.BaseDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class CityDto extends BaseDto<CityDto> {
    private Long id;
    private String name;
    private StateDto state;
    //private Collection<RegionDto> regions;

}
