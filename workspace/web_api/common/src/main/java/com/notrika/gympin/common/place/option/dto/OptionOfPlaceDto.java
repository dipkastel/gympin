package com.notrika.gympin.common.place.option.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.place.placeGym.dto.PlaceGymDto;
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
public class OptionOfPlaceDto extends BaseDtoWithCreateUpdate<OptionOfPlaceDto> {

    @JsonProperty("Place")
    private PlaceGymDto place;

    @JsonProperty("PlaceOption")
    private PlaceOptionDto placeOption;



}
