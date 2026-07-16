package com.notrika.gympin.controller.impl.ticket.ticketAppointment;

import com.notrika.gympin.common.place.placeCounseling.Counseling.param.CounselingParam;
import com.notrika.gympin.common.ticket.buyable.dto.TicketDiscountHistoryDto;
import com.notrika.gympin.common.ticket.ticketAppointment.api.TicketAppointmentController;
import com.notrika.gympin.common.ticket.ticketAppointment.dto.TicketAppointmentDto;
import com.notrika.gympin.common.ticket.ticketAppointment.param.TicketAppointmentParam;
import com.notrika.gympin.common.ticket.ticketAppointment.query.TicketAppointmentQuery;
import com.notrika.gympin.common.ticket.ticketAppointment.service.TicketAppointmentService;
import com.notrika.gympin.common.ticket.ticketSubscribe.dto.TicketSubscribeDto;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/TicketAppointment")
public class TicketAppointmentControllerImpl implements TicketAppointmentController {

    @Autowired
    private TicketAppointmentService ticketAppointmentService;

    @Override
    public ResponseEntity<TicketAppointmentDto> add(TicketAppointmentParam param) {
        return ResponseEntity.ok(ticketAppointmentService.add(param));
    }

    @Override
    public ResponseEntity<TicketAppointmentDto> update(TicketAppointmentParam param) {
        return ResponseEntity.ok(ticketAppointmentService.update(param));
    }

    @Override
    public ResponseEntity<TicketAppointmentDto> delete(TicketAppointmentParam param) {
        return ResponseEntity.ok(ticketAppointmentService.delete(param));
    }

    @Override
    public ResponseEntity<List<TicketAppointmentDto>> getAll(BasePagedParam param) {
        return ResponseEntity.ok(ticketAppointmentService.getAll(param));
    }

    @Override
    public ResponseEntity<TicketAppointmentDto> getById(Long id) {
        return ResponseEntity.ok(ticketAppointmentService.getById(id));
    }

    @Override
    public ResponseEntity<Page<TicketAppointmentDto>> query(TicketAppointmentQuery filter) {
        return ResponseEntity.ok(ticketAppointmentService.query(filter));
    }

    @Override
    @GetMapping("/getByCounseling")
    public ResponseEntity<List<TicketAppointmentDto>> getTicketAppointmentByCounseling(CounselingParam place) {
        return ResponseEntity.ok(ticketAppointmentService.getTicketAppointmentByCounseling(place));
    }

    @Override
    @GetMapping("/getTicketAppointmentDiscountHistory")
    public ResponseEntity<List<TicketDiscountHistoryDto>> getTicketAppointmentDiscountHistory(Long param) {
        return ResponseEntity.ok(ticketAppointmentService.getTicketAppointmentDiscountHistory(param));
    }

    @Override
    @GetMapping("/getTicketAppointmentDiscountHistoryByUser")
    public ResponseEntity<List<TicketDiscountHistoryDto>> getTicketAppointmentDiscountHistoryByUser(Long param) {
        return ResponseEntity.ok(ticketAppointmentService.getTicketAppointmentDiscountHistoryByUser(param));
    }

    @Override
    @PostMapping("/changeTicketAppointmentStatus")
    public ResponseEntity<TicketAppointmentDto> changeTicketAppointmentStatus(@RequestBody TicketAppointmentParam param) {
        return ResponseEntity.ok(ticketAppointmentService.ChangeTicketAppointmentStatus(param));
    }

}
