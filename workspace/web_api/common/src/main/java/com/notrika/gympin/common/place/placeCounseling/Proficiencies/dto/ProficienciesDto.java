package com.notrika.gympin.common.place.placeCounseling.Proficiencies.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreateUpdate;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class ProficienciesDto extends BaseDtoWithCreateUpdate<ProficienciesDto> {

    @JsonProperty("Name")
    private String name;

    @JsonProperty("LogoIds")
    private List<Long> logoIds;

}
