package com.notrika.gympin.common.location.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseDto;
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
public class RegionDto extends BaseDto<RegionDto> {

    @JsonProperty("Name")
    private String name;

    @JsonProperty("City")
    private CityDto city;
    //private Collection<PlaceDto> places;

}
