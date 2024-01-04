package com.notrika.gympin.common.place.place.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreateUpdate;
import com.notrika.gympin.common.settings.location.dto.LocationDto;
import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.place.place.enums.PlaceStatusEnum;
import com.notrika.gympin.common.sport.sport.dto.SportDto;
import com.notrika.gympin.common.user.user.enums.Gender;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

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

    @JsonProperty("Balance")
    private BigDecimal balance;

    @JsonProperty("Address")
    private String address;

    @JsonProperty("AutoDiscount")
    private Boolean autoDiscount;

    @JsonProperty("Genders")
    private Set<Gender> genders;

    @JsonProperty("MinPrice")
    private BigDecimal minPrice;

    @JsonProperty("Status")
    private PlaceStatusEnum status = PlaceStatusEnum.ACTIVE;

    @JsonProperty("Sports")
    private List<SportDto> Sports;

    @JsonProperty("Location")
    private LocationDto location;

    @JsonProperty("Multimedias")
    private List<MultimediaDto> multimedias;


}
