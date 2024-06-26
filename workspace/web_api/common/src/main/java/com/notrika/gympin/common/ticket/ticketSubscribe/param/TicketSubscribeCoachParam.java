package com.notrika.gympin.common.ticket.ticketSubscribe.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.ticket.ticketCourse.param.TicketCourseParam;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.util._base.param.BaseParam;
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
public class TicketSubscribeCoachParam extends BaseParam<TicketSubscribeCoachParam> {

    @JsonProperty(value = "TicketSubscribe", required = true)
    private TicketSubscribeParam ticketSubscribe;


    @JsonProperty(value = "PlaceCoach")
    private UserParam placeCoach;
}
