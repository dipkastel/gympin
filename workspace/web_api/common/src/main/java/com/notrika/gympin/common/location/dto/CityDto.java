package com.notrika.gympin.common.location.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
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

    @JsonProperty("Name")
    private String name;

    @JsonProperty("State")
    private StateDto state;
    //private Collection<RegionDto> regions;

}
