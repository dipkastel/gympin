package com.notrika.gympin.common.ticket.ticketCourse.service;

import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.place.placeSport.dto.PlaceSportDto;
import com.notrika.gympin.common.ticket.buyable.dto.TicketDiscountHistoryDto;
import com.notrika.gympin.common.ticket.common.dto.ActiveTimesDto;
import com.notrika.gympin.common.ticket.common.param.TicketActiveTimesParam;
import com.notrika.gympin.common.ticket.ticketCourse.dto.TicketCourseDto;
import com.notrika.gympin.common.ticket.ticketCourse.param.TicketCourseCoachParam;
import com.notrika.gympin.common.ticket.ticketCourse.param.TicketCourseParam;
import com.notrika.gympin.common.ticket.ticketCourse.param.TicketCourseSportParam;
import com.notrika.gympin.common.ticket.ticketCourse.query.TicketCourseQuery;
import com.notrika.gympin.common.ticket.ticketSubscribe.dto.TicketSubscribeDto;
import com.notrika.gympin.common.ticket.ticketSubscribe.param.TicketSubscribeParam;
import com.notrika.gympin.common.ticket.ticketSubscribe.param.TicketSubscribeSportParam;
import com.notrika.gympin.common.ticket.ticketSubscribe.query.TicketSubscribeQuery;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.util._base.base.BaseService;

import java.util.List;

public interface TicketCourseService extends BaseService<TicketCourseParam, TicketCourseDto, TicketCourseQuery> {

    List<TicketCourseDto> getTicketCourseByPlace(PlaceParam place);
    TicketCourseDto ChangeTicketCourseStatus(TicketCourseParam ticketCourseParam);

    //sport
    List<PlaceSportDto> getSports(Long ticketId);
    TicketCourseDto addSport(TicketCourseSportParam ticketSportParam);
    TicketCourseDto deleteSport(TicketCourseSportParam ticketSportParam);

    //coach
    List<UserDto> getCoaches(Long ticketId);
    TicketCourseDto addCoach(TicketCourseCoachParam ticketSportParam);
    TicketCourseDto deleteCoach(TicketCourseCoachParam ticketSportParam);

    //activeTime
    List<ActiveTimesDto> getTicketActiveTimesByTicketCourse(Long ticketCourseId);
    TicketCourseDto addCourseActiveTimes(TicketActiveTimesParam ticketActiveTimesParam);
    TicketCourseDto deleteCourseActiveTimes(TicketActiveTimesParam ticketActiveTimesParam);
}
