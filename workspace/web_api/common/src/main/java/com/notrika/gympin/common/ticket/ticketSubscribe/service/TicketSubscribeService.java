package com.notrika.gympin.common.ticket.ticketSubscribe.service;

import com.notrika.gympin.common.place.placeSport.dto.PlaceSportDto;
import com.notrika.gympin.common.ticket.common.dto.ActiveTimesDto;
import com.notrika.gympin.common.ticket.common.param.TicketActiveTimesParam;
import com.notrika.gympin.common.ticket.ticketSubscribe.param.TicketSubscribeCoachParam;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.util._base.base.BaseService;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymParam;
import com.notrika.gympin.common.ticket.buyable.dto.TicketDiscountHistoryDto;
import com.notrika.gympin.common.ticket.ticketSubscribe.dto.TicketSubscribeDto;
import com.notrika.gympin.common.ticket.ticketSubscribe.param.TicketSubscribeParam;
import com.notrika.gympin.common.ticket.ticketSubscribe.param.TicketSubscribeSportParam;
import com.notrika.gympin.common.ticket.ticketSubscribe.query.TicketSubscribeQuery;

import java.util.List;

public interface TicketSubscribeService extends BaseService<TicketSubscribeParam, TicketSubscribeDto, TicketSubscribeQuery> {

    List<TicketSubscribeDto> getTicketSubscribeByPlace(PlaceGymParam place);
    List<TicketDiscountHistoryDto> getTicketSubscribeDiscountHistory(Long ticketSubscribeId);
    TicketSubscribeDto ChangeTicketSubscribeStatus(TicketSubscribeParam ticketSubscribeParam);

    //sport
    List<PlaceSportDto> getSports(Long ticketSubscribeId);
    TicketSubscribeDto addSport(TicketSubscribeSportParam ticketSubscribeSportParam);
    TicketSubscribeDto deleteSport(TicketSubscribeSportParam ticketSubscribeSportParam);

    //coach
    List<UserDto> getCoaches(Long ticketId);
    TicketSubscribeDto addCoach(TicketSubscribeCoachParam param);
    TicketSubscribeDto deleteCoach(TicketSubscribeCoachParam param);

    //activeTime
    List<ActiveTimesDto> getTicketSubscribeActiveTimesByTicketSubscribe(Long ticketSubscribeId);
    TicketSubscribeDto addSubscribeActiveTimes(TicketActiveTimesParam ticketSubscribeActiveTimesParam);
    TicketSubscribeDto deleteSubscribeActiveTimes(TicketActiveTimesParam ticketSubscribeActiveTimesParam);
}
