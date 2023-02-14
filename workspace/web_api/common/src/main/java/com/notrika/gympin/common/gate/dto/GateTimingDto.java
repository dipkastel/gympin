package com.notrika.gympin.common.gate.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.dto.BaseDtoWithCreateUpdate;
import com.notrika.gympin.common.gate.enums.DayOfWeek;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.time.LocalTime;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class GateTimingDto extends BaseDtoWithCreateUpdate<GateTimingDto> {

    @JsonProperty(value = "Gate")
    private GateDto gate;

    @JsonProperty(value = "Name")
    private String name;

    @JsonProperty(value = "Day-of-week")
    private DayOfWeek dayOfWeek;

    @JsonProperty(value = "Opening-time")
    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern = "HH:mm:ss[.SSS][.SS][.S]")
    private LocalTime openingTime;

    @JsonProperty(value = "Closing-time")
    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern = "HH:mm:ss[.SSS][.SS][.S]")
    private LocalTime closingTime;


}
