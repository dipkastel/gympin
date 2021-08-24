package com.notrika.gympin.common.location.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseDto;
import com.notrika.gympin.common.option.place.dto.PlaceOptionDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class OptionOfPlaceDto extends BaseDto<OptionOfPlaceDto> {

    @JsonProperty("Place")
    private PlaceDto place;

    @JsonProperty("PlaceOption")
    private PlaceOptionDto placeOption;
}
