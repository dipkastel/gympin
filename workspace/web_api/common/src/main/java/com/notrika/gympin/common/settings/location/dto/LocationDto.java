package com.notrika.gympin.common.settings.location.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.dto.BaseDto;
import com.notrika.gympin.common.settings.location.enums.LocationType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class LocationDto extends BaseDto<LocationDto> {

    @JsonProperty("Name")
    private String name;

    @JsonProperty("MapPolygon")
    private String mapPolygon;

    @JsonProperty("CenterLat")
    private double centerLat;

    @JsonProperty("CenterLng")
    private double centerLng;

    @JsonProperty("Type")
    private LocationType locationType;

    @JsonProperty("Childes")
    private List<LocationDto> childes;

    @JsonProperty("parent")
    private LocationDto parent;

    @JsonProperty("parentName")
    private String parentName;

    @JsonProperty("parentName2")
    private String parentName2;

    @JsonProperty("parentName3")
    private String parentName3;

}
