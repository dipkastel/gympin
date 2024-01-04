package com.notrika.gympin.common.place.hall.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
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
public class HallTrafficDto extends BaseDtoWithCreateUpdate<HallTrafficDto> {

    @JsonProperty(value = "Hall")
    private HallDto hall;

    @JsonProperty(value = "Traffic")
    private Short traffic;


}
