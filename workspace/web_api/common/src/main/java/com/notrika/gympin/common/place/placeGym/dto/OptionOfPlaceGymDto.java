package com.notrika.gympin.common.place.placeGym.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreateUpdate;
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
public class OptionOfPlaceGymDto extends BaseDtoWithCreateUpdate<OptionOfPlaceGymDto> {

    @JsonProperty("Place")
    private PlaceGymDto place;

    @JsonProperty("PlaceOption")
    private PlaceOptionDto placeOption;
}
