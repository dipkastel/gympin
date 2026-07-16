package com.notrika.gympin.common.place.placeCounseling.CounselingProficiencies.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.place.placeCounseling.Counseling.dto.CounselingDto;
import com.notrika.gympin.common.place.placeCounseling.Proficiencies.dto.ProficienciesDto;
import com.notrika.gympin.common.place.placeGym.Gym.dto.PlaceGymDto;
import com.notrika.gympin.common.place.placeGym.sport.dto.SportDto;
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
public class CounselingProficienciesDto extends BaseDtoWithCreateUpdate<CounselingProficienciesDto> {

    @JsonProperty("Counseling")
    private CounselingDto counseling;

    @JsonProperty("Proficiencies")
    private ProficienciesDto proficiencies;
}
