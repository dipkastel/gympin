package com.notrika.gympin.common.ticket.ticketSubscribe.param;

import com.fasterxml.jackson.annotation.JsonProperty;
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
public class TicketSubscribeActiveTimesParam extends BaseParam<TicketSubscribeActiveTimesParam> {

    @JsonProperty(value = "TicketSubscribe", required = true)
    private TicketSubscribeParam ticketSubscribe;


    @JsonProperty(value = "ActiveTime", required = true)
    private List<ActiveTimesParam> activeTime;
}
