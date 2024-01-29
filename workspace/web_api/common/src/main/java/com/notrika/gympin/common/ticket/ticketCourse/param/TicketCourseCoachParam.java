package com.notrika.gympin.common.ticket.ticketCourse.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.place.placeSport.param.PlaceSportParam;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.util._base.param.BaseParam;
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
public class TicketCourseCoachParam extends BaseParam<TicketCourseCoachParam> {

    @JsonProperty(value = "TicketCourse", required = true)
    private TicketCourseParam ticketCourse;


    @JsonProperty(value = "PlaceCoach")
    private UserParam placeCoach;
}
