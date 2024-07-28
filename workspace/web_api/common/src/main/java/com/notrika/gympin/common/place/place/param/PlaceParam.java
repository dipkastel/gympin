package com.notrika.gympin.common.place.place.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.param.BaseParam;
import com.notrika.gympin.common.settings.location.param.LocationParam;
import com.notrika.gympin.common.place.place.enums.PlaceStatusEnum;
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
public class PlaceParam extends BaseParam<PlaceParam> {

    @JsonProperty("Name")
    private String name;

    @JsonProperty("Latitude")
    private double latitude;

    @JsonProperty("Longitude")
    private double longitude;

    @JsonProperty("Address")
    private String address;

    @JsonProperty("Tell")
    private String tell;

    @JsonProperty("CallUs")
    private Boolean callUs;

    @JsonProperty("AutoDiscount")
    private Boolean autoDiscount;

    @JsonProperty("Status")
    private PlaceStatusEnum status = PlaceStatusEnum.ACTIVE ;

    @JsonProperty("Location")
    private LocationParam location;

    @JsonProperty("about-place")
    private String aboutPlace;

    @JsonProperty("place-rules")
    private String placeRules;
}
