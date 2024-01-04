package com.notrika.gympin.controller.impl.ticket.buyable;

import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.ticket.buyable.api.TicketBuyableController;
import com.notrika.gympin.common.ticket.buyable.dto.TicketBuyableDto;
import com.notrika.gympin.common.ticket.buyable.param.TicketBuyableParam;
import com.notrika.gympin.common.ticket.buyable.query.TicketBuyableQuery;
import com.notrika.gympin.common.ticket.buyable.service.TicketBuyableService;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/TicketBuyable")
public class TicketBuyableControllerImpl implements TicketBuyableController {

    @Autowired
    private TicketBuyableService ticketBuyableService;

    @Override
    public ResponseEntity<TicketBuyableDto> add(TicketBuyableParam ticketBuyableParam) {
        return ResponseEntity.ok(ticketBuyableService.add(ticketBuyableParam));
    }

    @Override
    public ResponseEntity<TicketBuyableDto> update(TicketBuyableParam ticketBuyableParam) {
        return ResponseEntity.ok(ticketBuyableService.update(ticketBuyableParam));
    }

    @Override
    public ResponseEntity<TicketBuyableDto> delete(TicketBuyableParam ticketBuyableParam) {
        return ResponseEntity.ok(ticketBuyableService.delete(ticketBuyableParam));
    }

    @Override
    public ResponseEntity<List<TicketBuyableDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(ticketBuyableService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<TicketBuyableDto> getById(Long id) {
        return ResponseEntity.ok(ticketBuyableService.getById(id));
    }

    @Override
    public ResponseEntity<Page<TicketBuyableDto>> query(TicketBuyableQuery filter) {
        return ResponseEntity.ok(ticketBuyableService.query(filter));
    }


    @Override
    @PostMapping("setTicketBeneficiary")
    public ResponseEntity<TicketBuyableDto> setTicketBeneficiary(@RequestBody TicketBuyableParam param) {
        return ResponseEntity.ok(ticketBuyableService.setTicketBeneficiary(param));
    }
}
