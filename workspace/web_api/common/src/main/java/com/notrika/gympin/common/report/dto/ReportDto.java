package com.notrika.gympin.common.report.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.settings.location.enums.LocationType;
import com.notrika.gympin.common.util._base.dto.BaseDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class ReportDto extends BaseDto<ReportDto> {



    @JsonProperty("Values1")
    private ArrayList<Double> values1;

    @JsonProperty("Values2")
    private ArrayList<Double> values2;

    @JsonProperty("Values3")
    private ArrayList<Double> values3;

    @JsonProperty("Values4")
    private ArrayList<Double> values4;

    @JsonProperty("Values5")
    private ArrayList<Integer> values5;

    @JsonProperty("Values6")
    private ArrayList<Integer> values6;

    @JsonProperty("Values7")
    private ArrayList<Integer> values7;

    @JsonProperty("Values8")
    private ArrayList<Integer> values8;

    @JsonProperty("Values9")
    private ArrayList<BigDecimal> values9;

    @JsonProperty("Values10")
    private ArrayList<BigDecimal> values10;

    @JsonProperty("Values11")
    private ArrayList<BigDecimal> values11;

    @JsonProperty("Values12")
    private ArrayList<BigDecimal> values12;

    @JsonProperty("Values13")
    private ArrayList<String> values13;

    @JsonProperty("Values14")
    private ArrayList<String> values14;

    @JsonProperty("Values15")
    private ArrayList<String> values15;

    @JsonProperty("Values16")
    private ArrayList<String> values16;

}
