package com.notrika.gympin.common.report.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.dto.BaseDto;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@AllArgsConstructor
public class ReportUseCorporateChargeDto {

    @JsonProperty("Years")
    private List<String> years;

    @JsonProperty("MonthNames")
    private List<String> monthNames;

    @JsonProperty("Amounts")
    private List<BigDecimal> amounts;

}
