package com.notrika.gympin.common.place.place.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.dto.BaseDtoWithCreateUpdate;
import com.notrika.gympin.common.place.option.dto.PlaceOptionDto;
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
public class OptionOfPlaceDto extends BaseDtoWithCreateUpdate<OptionOfPlaceDto> {

    @JsonProperty("Place")
    private PlaceDto place;

    @JsonProperty("PlaceOption")
    private PlaceOptionDto placeOption;
}
