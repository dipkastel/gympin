package com.notrika.gympin.common.ticket.common.param;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.place.hall.param.HallParam;
import com.notrika.gympin.common.util._base.param.BaseParam;
import com.notrika.gympin.common.ticket.common.enums.DayOfWeek;
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
public class ActiveTimesParam extends BaseParam<ActiveTimesParam> {

    @JsonProperty(value = "Hall")
    private HallParam hall;

    @JsonProperty(value = "DayOfWeek")
    private DayOfWeek dayOfWeek;

    @JsonProperty(value = "Name")
    private String name;

    @JsonProperty(value = "OpeningTime")
    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern = "HH:mm:ss[.SSS][.SS][.S]")
    private LocalTime openingTime;

    @JsonProperty(value = "ClosingTime")
    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern = "HH:mm:ss[.SSS][.SS][.S]")
    private LocalTime closingTime;


}
