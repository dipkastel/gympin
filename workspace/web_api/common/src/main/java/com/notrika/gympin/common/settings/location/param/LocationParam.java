package com.notrika.gympin.common.settings.location.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.param.BaseParam;
import com.notrika.gympin.common.settings.location.dto.LocationDto;
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
public class LocationParam extends BaseParam<LocationParam> {

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
    private List<LocationParam> childes;

    @JsonProperty("parent")
    private LocationParam parent;
}
