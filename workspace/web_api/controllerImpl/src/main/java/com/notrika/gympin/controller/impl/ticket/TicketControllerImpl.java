package com.notrika.gympin.controller.impl.ticket;

import com.notrika.gympin.common._base.param.BasePagedParam;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.ticket.api.TicketController;
import com.notrika.gympin.common.ticket.dto.TicketDto;
import com.notrika.gympin.common.ticket.dto.TicketScannedDto;
import com.notrika.gympin.common.ticket.param.*;
import com.notrika.gympin.common.ticket.query.TicketQuery;
import com.notrika.gympin.common.ticket.service.TicketService;
import com.notrika.gympin.common.user.param.UserParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/ticket")
public class TicketControllerImpl implements TicketController {

    @Autowired
    TicketService ticketService;

    @Override
    public ResponseEntity<TicketDto> add(TicketParam ticketParam) {
        return ResponseEntity.ok(ticketService.add(ticketParam));
    }

    @Override
    public ResponseEntity<TicketDto> update(TicketParam ticketParam) {
        return ResponseEntity.ok(ticketService.update(ticketParam));
    }

    @Override
    public ResponseEntity<TicketDto> delete(TicketParam ticketParam) {
        return ResponseEntity.ok(ticketService.delete(ticketParam));
    }

    @Override
    public ResponseEntity<List<TicketDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(ticketService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<TicketDto> getById(Long id) {
        return ResponseEntity.ok(ticketService.getById(id));
    }

    @Override
    public ResponseEntity<Page<TicketDto>> query(TicketQuery param) {
        return ResponseEntity.ok(ticketService.query(param));
    }

    @Override
    @GetMapping("/getByUser")
    public ResponseEntity<List<TicketDto>> getByUser(UserParam userParam) {
        return ResponseEntity.ok(ticketService.getByUser(userParam));
    }

    @Override
    @PostMapping("/checkout")
    public ResponseEntity<TicketDto> checkout(@RequestBody TicketCheckoutParam param) throws Exception {
        return ResponseEntity.ok(ticketService.checkout(param));
    }

    @Override
    @GetMapping("/scannedTicket")
    public ResponseEntity<TicketScannedDto> scannedTicket(TicketParam param) throws Exception {
        return ResponseEntity.ok(ticketService.scannedTicket(param));
    }

    @Override
    @GetMapping("/acceptEnterRequested")
    public ResponseEntity<TicketScannedDto> acceptEnterRequested(Long ticketId) throws Exception {
        return ResponseEntity.ok(ticketService.acceptEnterRequest(ticketId));
    }

    @Override
    @PostMapping("/getUserTicketsByPlace")
    public ResponseEntity<List<TicketDto>> getUserTicketsByPlace(@RequestBody UserTicketsParam param) throws Exception {
        return ResponseEntity.ok(ticketService.getUserTicketsByPlace(param));
    }

    @Override
    @GetMapping("/getEnterRequested")
    public ResponseEntity<List<TicketDto>> getEnterRequestedTicket(Long placeId) {
        return ResponseEntity.ok(ticketService.getEnterRequestedTicket(placeId));
    }

    @Override
    @GetMapping("/getUserEntered")
    public ResponseEntity<List<TicketScannedDto>> getUserEnteredTicket(Long placeId) {
        return ResponseEntity.ok(ticketService.getUserEnteredByPlace(placeId));
    }

    @Override
    @PostMapping("/addEntryMessage")
    public ResponseEntity<TicketScannedDto> addEntryMessage(@RequestBody EntryMessageParam param) {
        return ResponseEntity.ok(ticketService.addEntryMessage(param));
    }

    @Override
    @PutMapping("/deleteEntryMessage")
    public ResponseEntity<Boolean> deleteEntryMessage(Long messageId) {
        return ResponseEntity.ok(ticketService.deleteEntryMessage(messageId));
    }


    @Override
    @GetMapping("/getActiveTickets")
    public ResponseEntity<List<TicketDto>> getActiveTicketsOfPlace(Long placeId) {
        return ResponseEntity.ok(ticketService.getActiveTicketsOfPlace(placeId));
    }

    @Override
    @PostMapping("/enterRequest")
    public ResponseEntity<Boolean> enterRequest(@RequestBody TicketParam param) throws Exception {
        return ResponseEntity.ok(ticketService.enterRequest(param));
    }

    @Override
    @GetMapping("/exitRequest")
    public ResponseEntity<Boolean> exitRequest(Long id) throws Exception {
        return ResponseEntity.ok(ticketService.exitRequest(id));
    }

    @Override
    @PostMapping("/increaseExpireDate")
    public ResponseEntity<Boolean> increaseExpireDate(@RequestBody IncreaseExpireParam param) throws Exception {
        return ResponseEntity.ok(ticketService.increaseExpireDate(param));
    }
}
