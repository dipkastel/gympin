package com.notrika.gympin.common.place.placeBase.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.place.placeBase.enums.PlaceStatusEnum;
import com.notrika.gympin.common.settings.location.dto.LocationDto;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreateUpdate;
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
public class PlaceDto extends BaseDtoWithCreateUpdate<PlaceDto> {

    @JsonProperty("Name")
    private String name;

    @JsonProperty("Latitude")
    private double latitude;

    @JsonProperty("Longitude")
    private double longitude;

    @JsonProperty("Tell")
    private String tell;

    @JsonProperty("Address")
    private String address;

    @JsonProperty("Status")
    private PlaceStatusEnum status = PlaceStatusEnum.ACTIVE;

    @JsonProperty("Location")
    private LocationDto location;

    @JsonProperty("PlaceType")
    private String placeType;


    @JsonProperty("Rate")
    private Double rate;



}
