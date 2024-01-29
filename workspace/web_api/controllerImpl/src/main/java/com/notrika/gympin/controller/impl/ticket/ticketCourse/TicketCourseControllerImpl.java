package com.notrika.gympin.controller.impl.ticket.ticketCourse;

import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.place.placeSport.dto.PlaceSportDto;
import com.notrika.gympin.common.ticket.common.dto.ActiveTimesDto;
import com.notrika.gympin.common.ticket.common.param.TicketActiveTimesParam;
import com.notrika.gympin.common.ticket.ticketCourse.api.TicketCourseController;
import com.notrika.gympin.common.ticket.ticketCourse.dto.TicketCourseDto;
import com.notrika.gympin.common.ticket.ticketCourse.param.TicketCourseCoachParam;
import com.notrika.gympin.common.ticket.ticketCourse.param.TicketCourseParam;
import com.notrika.gympin.common.ticket.ticketCourse.param.TicketCourseSportParam;
import com.notrika.gympin.common.ticket.ticketCourse.query.TicketCourseQuery;
import com.notrika.gympin.common.ticket.ticketCourse.service.TicketCourseService;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/TicketCourse")
public class TicketCourseControllerImpl implements TicketCourseController {

    @Autowired
    private TicketCourseService ticketCourseService;

    @Override
    public ResponseEntity<TicketCourseDto> add(TicketCourseParam ticketCourseParam) {
        return ResponseEntity.ok(ticketCourseService.add(ticketCourseParam));
    }

    @Override
    public ResponseEntity<TicketCourseDto> update(TicketCourseParam ticketCourseParam) {
        return ResponseEntity.ok(ticketCourseService.update(ticketCourseParam));
    }

    @Override
    public ResponseEntity<TicketCourseDto> delete(TicketCourseParam ticketCourseParam) {
        return ResponseEntity.ok(ticketCourseService.delete(ticketCourseParam));
    }

    @Override
    public ResponseEntity<List<TicketCourseDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(ticketCourseService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<TicketCourseDto> getById(Long id) {
        return ResponseEntity.ok(ticketCourseService.getById(id));
    }

    @Override
    public ResponseEntity<Page<TicketCourseDto>> query(TicketCourseQuery filter) {
        return ResponseEntity.ok(ticketCourseService.query(filter));
    }


    @Override
    @GetMapping("/getByPlace")
    public ResponseEntity<List<TicketCourseDto>> getTicketCourseByPlace(PlaceParam place) {
        return ResponseEntity.ok(ticketCourseService.getTicketCourseByPlace(place));
    }

    @Override
    @GetMapping("/getSports")
    public ResponseEntity<List<PlaceSportDto>> getSports(Long ticketId) {
        return ResponseEntity.ok(ticketCourseService.getSports(ticketId));
    }

    @Override
    @PostMapping("/addSport")
    public ResponseEntity<TicketCourseDto> addSport(@RequestBody TicketCourseSportParam ticketCourseSportParam) {
        return ResponseEntity.ok(ticketCourseService.addSport(ticketCourseSportParam));
    }

    @Override
    @PutMapping("/deleteSport")
    public ResponseEntity<TicketCourseDto> deleteSport(@RequestBody TicketCourseSportParam ticketCourseSportParam) {
        return ResponseEntity.ok(ticketCourseService.deleteSport(ticketCourseSportParam));
    }

    @Override
    @GetMapping("/getCoaches")
    public ResponseEntity<List<UserDto>> getCoaches(Long ticketId) {
        return ResponseEntity.ok(ticketCourseService.getCoaches(ticketId));
    }

    @Override
    @PostMapping("/addCoach")
    public ResponseEntity<TicketCourseDto> addCoach(@RequestBody TicketCourseCoachParam param) {
        return ResponseEntity.ok(ticketCourseService.addCoach(param));
    }

    @Override
    @PutMapping("/deleteCoach")
    public ResponseEntity<TicketCourseDto> deleteCoach(@RequestBody TicketCourseCoachParam param) {
        return ResponseEntity.ok(ticketCourseService.deleteCoach(param));
    }

    @Override
    @PostMapping("/changeTicketCourseStatus")
    public ResponseEntity<TicketCourseDto> changeTicketCourseStatus(@RequestBody TicketCourseParam ticketCourseParam) {
        return ResponseEntity.ok(ticketCourseService.ChangeTicketCourseStatus(ticketCourseParam));
    }

    @Override
    @GetMapping("/getActiveTimesByTicketCourse")
    public ResponseEntity<List<ActiveTimesDto>> getActiveTimesByTicketCourse(Long ticketCourseId) {
        return ResponseEntity.ok(ticketCourseService.getTicketActiveTimesByTicketCourse(ticketCourseId));
    }

    @Override
    @PostMapping("/addCourseActiveTimes")
    public ResponseEntity<TicketCourseDto> addCourseActiveTimes(@RequestBody TicketActiveTimesParam ticketActiveTimesParam) {
        return ResponseEntity.ok(ticketCourseService.addCourseActiveTimes(ticketActiveTimesParam));
    }

    @Override
    @PutMapping("/deleteCourseActiveTimes")
    public ResponseEntity<TicketCourseDto> deleteCourseActiveTimes(@RequestBody TicketActiveTimesParam ticketActiveTimesParam) {
        return ResponseEntity.ok(ticketCourseService.deleteCourseActiveTimes(ticketActiveTimesParam));
    }

}
