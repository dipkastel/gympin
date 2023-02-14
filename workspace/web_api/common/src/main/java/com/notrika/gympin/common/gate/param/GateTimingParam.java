package com.notrika.gympin.common.gate.param;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.param.BaseParam;
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
public class GateTimingParam extends BaseParam<GateTimingParam> {

    @JsonProperty(value = "Gate", required = true)
    private GateParam gate;

    @JsonProperty(value = "Name", required = true)
    private String name;

    @JsonProperty(value = "Day-of-week", required = true)
    private DayOfWeek dayOfWeek;

    @JsonProperty(value = "Opening-time", required = true)
    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern = "HH:mm:ss[.SSS][.SS][.S]")
    private LocalTime openingTime;

    @JsonProperty(value = "Closing-time", required = true)
    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern = "HH:mm:ss[.SSS][.SS][.S]")
    private LocalTime closingTime;


}
