package com.notrika.gympin.common.ticket.common.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.ticket.buyable.param.TicketBuyableParam;
import com.notrika.gympin.common.ticket.ticketSubscribe.param.TicketSubscribeParam;
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
public class TicketActiveTimesParam extends BaseParam<TicketActiveTimesParam> {

    @JsonProperty(value = "Ticket", required = true)
    private TicketBuyableParam ticket;


    @JsonProperty(value = "ActiveTime", required = true)
    private List<ActiveTimesParam> activeTime;
}
