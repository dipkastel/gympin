package com.notrika.gympin.common.ticket.ticketSubscribe.api;

import com.notrika.gympin.common.place.placeSport.dto.PlaceSportDto;
import com.notrika.gympin.common.ticket.common.dto.ActiveTimesDto;
import com.notrika.gympin.common.ticket.common.param.TicketActiveTimesParam;
import com.notrika.gympin.common.ticket.ticketCourse.dto.TicketCourseDto;
import com.notrika.gympin.common.ticket.ticketCourse.param.TicketCourseCoachParam;
import com.notrika.gympin.common.ticket.ticketSubscribe.param.TicketSubscribeCoachParam;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.util._base.base.BaseController;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.ticket.buyable.dto.TicketDiscountHistoryDto;
import com.notrika.gympin.common.ticket.ticketSubscribe.dto.TicketSubscribeDto;
import com.notrika.gympin.common.ticket.ticketSubscribe.param.TicketSubscribeParam;
import com.notrika.gympin.common.ticket.ticketSubscribe.param.TicketSubscribeSportParam;
import com.notrika.gympin.common.ticket.ticketSubscribe.query.TicketSubscribeQuery;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface TicketSubscribeController extends BaseController<TicketSubscribeParam, TicketSubscribeDto, TicketSubscribeQuery> {

    ResponseEntity<List<TicketSubscribeDto>> getTicketSubscribeByPlace(PlaceParam place);
    ResponseEntity<List<TicketDiscountHistoryDto>> getTicketSubscribeDiscountHistory(Long ticketSubscribeId);
    ResponseEntity<TicketSubscribeDto> changeTicketSubscribeStatus(TicketSubscribeParam ticketSubscribeParam);

    //activeTime
    ResponseEntity<TicketSubscribeDto> addSubscribeActiveTimes(TicketActiveTimesParam ticketSubscribeActiveTimesParam);
    ResponseEntity<List<ActiveTimesDto>> getSubscribeActiveTimesByTicketSubscribe(Long ticketSubscribeId);
    ResponseEntity<TicketSubscribeDto> deleteSubscribeActiveTimes(TicketActiveTimesParam ticketSubscribeActiveTimesParam);

    //sport
    ResponseEntity<TicketSubscribeDto> deleteSport(TicketSubscribeSportParam ticketSubscribeSportParam);
    ResponseEntity<List<PlaceSportDto>> getSports(Long ticketSubscribeId);
    ResponseEntity<TicketSubscribeDto> addSport(TicketSubscribeSportParam ticketSubscribeSportParam);

    //coach
    ResponseEntity<List<UserDto>> getCoaches(Long ticketId);
    ResponseEntity<TicketSubscribeDto> addCoach(TicketSubscribeCoachParam param);
    ResponseEntity<TicketSubscribeDto> deleteCoach(TicketSubscribeCoachParam param);
}
