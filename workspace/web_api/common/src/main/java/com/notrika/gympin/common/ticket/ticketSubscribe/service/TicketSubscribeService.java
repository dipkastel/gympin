package com.notrika.gympin.common.ticket.ticketSubscribe.service;

import com.notrika.gympin.common.place.placeSport.dto.PlaceSportDto;
import com.notrika.gympin.common.ticket.ticketSubscribe.dto.ActiveTimesDto;
import com.notrika.gympin.common.ticket.ticketSubscribe.param.TicketSubscribeActiveTimesParam;
import com.notrika.gympin.common.util._base.base.BaseService;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.ticket.ticketSubscribe.dto.TicketSubscribeDiscountHistoryDto;
import com.notrika.gympin.common.ticket.ticketSubscribe.dto.TicketSubscribeDto;
import com.notrika.gympin.common.ticket.ticketSubscribe.param.TicketSubscribeParam;
import com.notrika.gympin.common.ticket.ticketSubscribe.param.TicketSubscribeSportParam;
import com.notrika.gympin.common.ticket.ticketSubscribe.query.TicketSubscribeQuery;

import java.util.List;

public interface TicketSubscribeService extends BaseService<TicketSubscribeParam, TicketSubscribeDto, TicketSubscribeQuery> {

    List<TicketSubscribeDto> getTicketSubscribeByPlace(PlaceParam place);
    List<PlaceSportDto> getSports(Long ticketSubscribeId);
    TicketSubscribeDto addSport(TicketSubscribeSportParam ticketSubscribeSportParam);
    TicketSubscribeDto deleteSport(TicketSubscribeSportParam ticketSubscribeSportParam);
    List<TicketSubscribeDiscountHistoryDto> getTicketSubscribeDiscountHistory(Long ticketSubscribeId);
    TicketSubscribeDto ChangeTicketSubscribeStatus(TicketSubscribeParam ticketSubscribeParam);

    List<ActiveTimesDto> getTicketSubscribeActiveTimesByTicketSubscribe(Long ticketSubscribeId);
    TicketSubscribeDto addSubscribeActiveTimes(TicketSubscribeActiveTimesParam ticketSubscribeActiveTimesParam);
    TicketSubscribeDto deleteSubscribeActiveTimes(TicketSubscribeActiveTimesParam ticketSubscribeActiveTimesParam);
}
