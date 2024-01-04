package com.notrika.gympin.common.place.hall.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.ticket.ticketSubscribe.param.ActiveTimesParam;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreateUpdate;
import com.notrika.gympin.common.place.place.dto.PlaceDto;
import com.notrika.gympin.common.sport.sport.dto.SportDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class HallDto extends BaseDtoWithCreateUpdate<HallDto> {

    @JsonProperty(value = "Name")
    private String name;

    @JsonProperty(value = "Place")
    private PlaceDto place;

    @JsonProperty(value = "Sport")
    private SportDto sport;

    @JsonProperty(value = "Enable")
    private Boolean enable;

    @JsonProperty(value = "TrafficManagement")
    private Boolean trafficManagement;

    @JsonProperty(value = "Action")
    private List<ActiveTimesParam> action;
}
