package com.notrika.gympin.common.ticket.ticketCourse.api;

import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.place.placeSport.dto.PlaceSportDto;
import com.notrika.gympin.common.ticket.common.dto.ActiveTimesDto;
import com.notrika.gympin.common.ticket.common.param.TicketActiveTimesParam;
import com.notrika.gympin.common.ticket.ticketCourse.dto.TicketCourseDto;
import com.notrika.gympin.common.ticket.ticketCourse.param.TicketCourseCoachParam;
import com.notrika.gympin.common.ticket.ticketCourse.param.TicketCourseParam;
import com.notrika.gympin.common.ticket.ticketCourse.param.TicketCourseSportParam;
import com.notrika.gympin.common.ticket.ticketCourse.query.TicketCourseQuery;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.util._base.base.BaseController;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface TicketCourseController extends BaseController<TicketCourseParam, TicketCourseDto, TicketCourseQuery> {

    ResponseEntity<List<TicketCourseDto>> getTicketCourseByPlace(PlaceParam place);
    ResponseEntity<TicketCourseDto> changeTicketCourseStatus(TicketCourseParam ticketCourseParam);

    //activeTimes
    ResponseEntity<List<ActiveTimesDto>> getActiveTimesByTicketCourse(Long ticketCourseId);
    ResponseEntity<TicketCourseDto> addCourseActiveTimes(TicketActiveTimesParam ticketActiveTimesParam);
    ResponseEntity<TicketCourseDto> deleteCourseActiveTimes(TicketActiveTimesParam ticketActiveTimesParam);

    //sports
    ResponseEntity<List<PlaceSportDto>> getSports(Long ticketCourseId);
    ResponseEntity<TicketCourseDto> addSport(TicketCourseSportParam ticketCourseSportParam);
    ResponseEntity<TicketCourseDto> deleteSport(TicketCourseSportParam ticketCourseSportParam);

    //coach
    ResponseEntity<List<UserDto>> getCoaches(Long ticketId);
    ResponseEntity<TicketCourseDto> addCoach(TicketCourseCoachParam ticketCourseSportParam);
    ResponseEntity<TicketCourseDto> deleteCoach(TicketCourseCoachParam ticketCourseSportParam);

}
