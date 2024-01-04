package com.notrika.gympin.common.place.about.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreateUpdate;
import com.notrika.gympin.common.place.place.dto.PlaceDto;
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
public class PlaceAboutDto extends BaseDtoWithCreateUpdate<PlaceAboutDto> {

    @JsonProperty("Name")
    private String name;

    @JsonProperty("Description")
    private String description;

    @JsonProperty("Acceptable")
    private Boolean acceptable;

    @JsonProperty("Active")
    private Boolean active;

    @JsonProperty("Place")
    private PlaceDto place;

}
