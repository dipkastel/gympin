package com.notrika.gympin.common.ticket.ticketSubscribe.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.place.placeSport.param.PlaceSportParam;
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
public class TicketSubscribeSportParam extends BaseParam<TicketSubscribeSportParam> {

    @JsonProperty(value = "TicketSubscribe", required = true)
    private TicketSubscribeParam ticketSubscribe;


    @JsonProperty(value = "PlaceSport", required = true)
    private List<PlaceSportParam> placeSports;
}
