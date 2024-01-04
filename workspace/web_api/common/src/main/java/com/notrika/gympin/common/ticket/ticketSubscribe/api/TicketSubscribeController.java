package com.notrika.gympin.common.ticket.ticketSubscribe.api;

import com.notrika.gympin.common.place.placeSport.dto.PlaceSportDto;
import com.notrika.gympin.common.ticket.ticketSubscribe.dto.ActiveTimesDto;
import com.notrika.gympin.common.ticket.ticketSubscribe.param.TicketSubscribeActiveTimesParam;
import com.notrika.gympin.common.util._base.base.BaseController;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.ticket.ticketSubscribe.dto.TicketSubscribeDiscountHistoryDto;
import com.notrika.gympin.common.ticket.ticketSubscribe.dto.TicketSubscribeDto;
import com.notrika.gympin.common.ticket.ticketSubscribe.param.TicketSubscribeParam;
import com.notrika.gympin.common.ticket.ticketSubscribe.param.TicketSubscribeSportParam;
import com.notrika.gympin.common.ticket.ticketSubscribe.query.TicketSubscribeQuery;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface TicketSubscribeController extends BaseController<TicketSubscribeParam, TicketSubscribeDto, TicketSubscribeQuery> {

    ResponseEntity<List<TicketSubscribeDto>> getTicketSubscribeByPlace(PlaceParam place);
    ResponseEntity<List<PlaceSportDto>> getSports(Long ticketSubscribeId);
    ResponseEntity<TicketSubscribeDto> addSport(TicketSubscribeSportParam ticketSubscribeSportParam);
    ResponseEntity<TicketSubscribeDto> addSubscribeActiveTimes(TicketSubscribeActiveTimesParam ticketSubscribeActiveTimesParam);
    ResponseEntity<List<ActiveTimesDto>> getSubscribeActiveTimesByTicketSubscribe(Long ticketSubscribeId);
    ResponseEntity<TicketSubscribeDto> deleteSubscribeActiveTimes(TicketSubscribeActiveTimesParam ticketSubscribeActiveTimesParam);

    ResponseEntity<TicketSubscribeDto> deleteSport(TicketSubscribeSportParam ticketSubscribeSportParam);
    ResponseEntity<List<TicketSubscribeDiscountHistoryDto>> getTicketSubscribeDiscountHistory(Long ticketSubscribeId);
    ResponseEntity<TicketSubscribeDto> changeTicketSubscribeStatus(TicketSubscribeParam ticketSubscribeParam);
}
