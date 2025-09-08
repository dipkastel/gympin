package com.notrika.gympin.common.report.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.dto.BaseDto;
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
public class ReportGenderCompetitionDto extends BaseDto<ReportGenderCompetitionDto> {


    @JsonProperty("UsesManInMonth")
    private Long usesManInMonth;

    @JsonProperty("UsesWomanInMonth")
    private Long usesWomanInMonth;

    @JsonProperty("UsesManInTotal")
    private Long usesManInTotal;

    @JsonProperty("UsesWomanInTotal")
    private Long usesWomanInTotal;


}
