package com.notrika.gympin.common.place.hall.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymParam;
import com.notrika.gympin.common.ticket.common.param.ActiveTimesParam;
import com.notrika.gympin.common.util._base.param.BaseParam;
import com.notrika.gympin.common.sport.sport.param.SportParam;
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
public class HallParam extends BaseParam<HallParam> {

    @JsonProperty(value = "Name", required = true)
    private String name;

    @JsonProperty(value = "Place", required = true)
    private PlaceGymParam place;

    @JsonProperty(value = "Sport", required = true)
    private SportParam sport;

    @JsonProperty(value = "Enable")
    private Boolean enable;

    @JsonProperty(value = "TrafficManagement")
    private Boolean trafficManagement;

    @JsonProperty(value = "Action")
    private List<ActiveTimesParam> action;

}
