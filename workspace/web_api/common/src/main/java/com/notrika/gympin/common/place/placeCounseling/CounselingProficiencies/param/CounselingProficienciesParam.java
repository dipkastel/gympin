package com.notrika.gympin.common.place.placeCounseling.CounselingProficiencies.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.place.placeCounseling.Counseling.param.CounselingParam;
import com.notrika.gympin.common.place.placeCounseling.Proficiencies.param.ProficienciesParam;
import com.notrika.gympin.common.place.placeGym.Gym.param.PlaceGymParam;
import com.notrika.gympin.common.place.placeGym.sport.param.SportParam;
import com.notrika.gympin.common.util._base.param.BaseParam;
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
public class CounselingProficienciesParam extends BaseParam<CounselingProficienciesParam> {

    @JsonProperty("Counseling")
    private CounselingParam counseling;

    @JsonProperty("Proficiencies")
    private ProficienciesParam proficiencies;

}
