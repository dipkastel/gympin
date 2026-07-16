package com.notrika.gympin.common.place.parts.qrMessage.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.place.placeGym.Gym.dto.PlaceGymDto;
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
public class PlaceQrMessageDto extends BaseDtoWithCreateUpdate<PlaceQrMessageDto> {

    @JsonProperty("Text")
    private String text;

    @JsonProperty("ReplaceText")
    private String replace_text;

    @JsonProperty("Place")
    private PlaceGymDto place;

}
