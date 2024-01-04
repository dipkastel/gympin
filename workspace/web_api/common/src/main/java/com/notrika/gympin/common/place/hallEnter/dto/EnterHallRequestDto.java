package com.notrika.gympin.common.place.hallEnter.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.dto.BaseDto;
import com.notrika.gympin.common.place.hall.dto.HallDto;
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
public class EnterHallRequestDto extends BaseDto<EnterHallRequestDto> {

    @JsonProperty(value = "reference-id")
    private String referenceId;

    @JsonProperty(value = "hall")
    private HallDto hall;

}
