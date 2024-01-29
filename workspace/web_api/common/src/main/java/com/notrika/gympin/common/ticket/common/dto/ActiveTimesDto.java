package com.notrika.gympin.common.ticket.common.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.place.hall.dto.HallDto;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreateUpdate;
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
public class ActiveTimesDto extends BaseDtoWithCreateUpdate<ActiveTimesDto> {

    @JsonProperty(value = "Hall")
    private HallDto hall;

    @JsonProperty(value = "Name")
    private String name;

    @JsonProperty(value = "DayOfWeek")
    private DayOfWeek dayOfWeek;

    @JsonProperty(value = "OpeningTime")
    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern = "HH:mm:ss[.SSS][.SS][.S]")
    private LocalTime openingTime;

    @JsonProperty(value = "ClosingTime")
    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern = "HH:mm:ss[.SSS][.SS][.S]")
    private LocalTime closingTime;


}
