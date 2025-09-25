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
public class ReportPopularSportDto extends BaseDto<ReportPopularSportDto> {


    @JsonProperty("SportName")
    private String sportName;

    @JsonProperty("SportCount")
    private Long sportCount;

    @JsonProperty("SportEnteryCount")
    private Long sportEnteryCount;


}
