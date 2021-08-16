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
public class PlaceDto extends BaseDto<PlaceDto> {
    private Long id;
    private String name;
    private double latitude;
    private double longitude;
    private RegionDto region;

}
