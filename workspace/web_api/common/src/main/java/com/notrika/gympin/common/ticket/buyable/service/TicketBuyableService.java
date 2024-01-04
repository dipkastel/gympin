package com.notrika.gympin.common.ticket.buyable.service;

import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.place.placeSport.dto.PlaceSportDto;
import com.notrika.gympin.common.ticket.buyable.dto.TicketBuyableDto;
import com.notrika.gympin.common.ticket.buyable.param.TicketBuyableParam;
import com.notrika.gympin.common.ticket.buyable.query.TicketBuyableQuery;
import com.notrika.gympin.common.ticket.ticketSubscribe.dto.ActiveTimesDto;
import com.notrika.gympin.common.ticket.ticketSubscribe.dto.TicketSubscribeDiscountHistoryDto;
import com.notrika.gympin.common.ticket.ticketSubscribe.dto.TicketSubscribeDto;
import com.notrika.gympin.common.ticket.ticketSubscribe.param.TicketSubscribeActiveTimesParam;
import com.notrika.gympin.common.ticket.ticketSubscribe.param.TicketSubscribeParam;
import com.notrika.gympin.common.ticket.ticketSubscribe.param.TicketSubscribeSportParam;
import com.notrika.gympin.common.ticket.ticketSubscribe.query.TicketSubscribeQuery;
import com.notrika.gympin.common.util._base.base.BaseService;
import com.notrika.gympin.common.util._base.param.BasePagedParam;

import java.util.List;

public interface TicketBuyableService extends BaseService<TicketBuyableParam, TicketBuyableDto, TicketBuyableQuery> {

    TicketBuyableDto setTicketBeneficiary(TicketBuyableParam param);
}
