package com.notrika.gympin.controller.impl.ticket.ticketSubscribe;

import com.notrika.gympin.common.place.placeGym.param.PlaceGymParam;
import com.notrika.gympin.common.place.placeSport.dto.PlaceSportDto;
import com.notrika.gympin.common.ticket.common.dto.ActiveTimesDto;
import com.notrika.gympin.common.ticket.common.param.TicketActiveTimesParam;
import com.notrika.gympin.common.ticket.ticketSubscribe.param.TicketSubscribeCoachParam;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.ticket.ticketSubscribe.api.TicketSubscribeController;
import com.notrika.gympin.common.ticket.buyable.dto.TicketDiscountHistoryDto;
import com.notrika.gympin.common.ticket.ticketSubscribe.dto.TicketSubscribeDto;
import com.notrika.gympin.common.ticket.ticketSubscribe.param.TicketSubscribeParam;
import com.notrika.gympin.common.ticket.ticketSubscribe.param.TicketSubscribeSportParam;
import com.notrika.gympin.common.ticket.ticketSubscribe.query.TicketSubscribeQuery;
import com.notrika.gympin.common.ticket.ticketSubscribe.service.TicketSubscribeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/TicketSubscribe")
public class TicketSubscribeControllerImpl implements TicketSubscribeController {

    @Autowired
    private TicketSubscribeService ticketSubscribeService;

    @Override
    public ResponseEntity<TicketSubscribeDto> add(TicketSubscribeParam ticketSubscribeParam) {
        return ResponseEntity.ok(ticketSubscribeService.add(ticketSubscribeParam));
    }

    @Override
    public ResponseEntity<TicketSubscribeDto> update(TicketSubscribeParam ticketSubscribeParam) {
        return ResponseEntity.ok(ticketSubscribeService.update(ticketSubscribeParam));
    }

    @Override
    public ResponseEntity<TicketSubscribeDto> delete(TicketSubscribeParam ticketSubscribeParam) {
        return ResponseEntity.ok(ticketSubscribeService.delete(ticketSubscribeParam));
    }

    @Override
    public ResponseEntity<List<TicketSubscribeDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(ticketSubscribeService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<TicketSubscribeDto> getById(Long id) {
        return ResponseEntity.ok(ticketSubscribeService.getById(id));
    }

    @Override
    public ResponseEntity<Page<TicketSubscribeDto>> query(TicketSubscribeQuery filter) {
        return ResponseEntity.ok(ticketSubscribeService.query(filter));
    }


    @Override
    @GetMapping("/getByPlace")
    public ResponseEntity<List<TicketSubscribeDto>> getTicketSubscribeByPlace(PlaceGymParam place) {
        return ResponseEntity.ok(ticketSubscribeService.getTicketSubscribeByPlace(place));
    }

    @Override
    @GetMapping("/getSports")
    public ResponseEntity<List<PlaceSportDto>> getSports(Long ticketSubscribeId) {
        return ResponseEntity.ok(ticketSubscribeService.getSports(ticketSubscribeId));
    }

    @Override
    @PostMapping("/addSport")
    public ResponseEntity<TicketSubscribeDto> addSport(@RequestBody TicketSubscribeSportParam ticketSubscribeSportParam) {
        return ResponseEntity.ok(ticketSubscribeService.addSport(ticketSubscribeSportParam));
    }

    @Override
    @PutMapping("/deleteSport")
    public ResponseEntity<TicketSubscribeDto> deleteSport(@RequestBody TicketSubscribeSportParam ticketSubscribeSportParam) {
        return ResponseEntity.ok(ticketSubscribeService.deleteSport(ticketSubscribeSportParam));
    }


    @Override
    @GetMapping("/getCoaches")
    public ResponseEntity<List<UserDto>> getCoaches(Long ticketId) {
        return ResponseEntity.ok(ticketSubscribeService.getCoaches(ticketId));
    }

    @Override
    @PostMapping("/addCoach")
    public ResponseEntity<TicketSubscribeDto> addCoach(@RequestBody TicketSubscribeCoachParam param) {
        return ResponseEntity.ok(ticketSubscribeService.addCoach(param));
    }

    @Override
    @PutMapping("/deleteCoach")
    public ResponseEntity<TicketSubscribeDto> deleteCoach(@RequestBody TicketSubscribeCoachParam param) {
        return ResponseEntity.ok(ticketSubscribeService.deleteCoach(param));
    }
    @Override
    @GetMapping("/getTicketSubscribeDiscountHistory")
    public ResponseEntity<List<TicketDiscountHistoryDto>> getTicketSubscribeDiscountHistory(Long ticketSubscribeId) {
        return ResponseEntity.ok(ticketSubscribeService.getTicketSubscribeDiscountHistory(ticketSubscribeId));
    }
    @Override
    @PostMapping("/changeTicketSubscribeStatus")
    public ResponseEntity<TicketSubscribeDto> changeTicketSubscribeStatus(@RequestBody TicketSubscribeParam ticketSubscribeParam) {
        return ResponseEntity.ok(ticketSubscribeService.ChangeTicketSubscribeStatus(ticketSubscribeParam));
    }

    @Override
    @GetMapping("/getActiveTimesByTicketSubscribe")
    public ResponseEntity<List<ActiveTimesDto>> getSubscribeActiveTimesByTicketSubscribe(Long ticketSubscribeId) {
        return ResponseEntity.ok(ticketSubscribeService.getTicketSubscribeActiveTimesByTicketSubscribe(ticketSubscribeId));
    }

    @Override
    @PostMapping("/addSubscribeActiveTimes")
    public ResponseEntity<TicketSubscribeDto> addSubscribeActiveTimes(@RequestBody TicketActiveTimesParam ticketSubscribeActiveTimesParam) {
        return ResponseEntity.ok(ticketSubscribeService.addSubscribeActiveTimes(ticketSubscribeActiveTimesParam));
    }

    @Override
    @PutMapping("/deleteSubscribeActiveTimes")
    public ResponseEntity<TicketSubscribeDto> deleteSubscribeActiveTimes(@RequestBody TicketActiveTimesParam ticketSubscribeActiveTimesParam) {
        return ResponseEntity.ok(ticketSubscribeService.deleteSubscribeActiveTimes(ticketSubscribeActiveTimesParam));
    }

}
