package com.notrika.gympin.common.place.place.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.dto.BaseDtoWithCreateUpdate;
import com.notrika.gympin.common.location.dto.LocationDto;
import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.place.place.enums.PlaceStatusEnum;
import com.notrika.gympin.common.sport.dto.SportDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.List;

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

    @JsonProperty("CommissionFee")
    private double commissionFee;

    @JsonProperty("Balance")
    private BigDecimal balance;

    @JsonProperty("Address")
    private String address;

    @JsonProperty("Status")
    private PlaceStatusEnum status = PlaceStatusEnum.ACTIVE;

    @JsonProperty("Sports")
    private List<SportDto> Sports;

    @JsonProperty("Location")
    private LocationDto location;

    @JsonProperty("Multimedias")
    private List<MultimediaDto> multimedias;


}