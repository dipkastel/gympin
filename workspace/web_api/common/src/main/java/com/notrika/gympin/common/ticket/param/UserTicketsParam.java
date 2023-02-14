package com.notrika.gympin.common.ticket.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.param.BaseParam;
import com.notrika.gympin.common.plan.param.PlanParam;
import com.notrika.gympin.common.ticket.enums.TicketStatus;
import com.notrika.gympin.common.user.param.UserParam;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.Date;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class UserTicketsParam extends BaseParam<UserTicketsParam> {

    @JsonProperty("UserId")
    private Long userId;

    @JsonProperty("PlaceId")
    private Long placeId;

}
