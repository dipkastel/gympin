package com.notrika.gympin.controller.impl.ticket.ticketFood;

import com.notrika.gympin.common.ticket.ticketFood.api.TicketFoodController;
import com.notrika.gympin.common.ticket.ticketFood.dto.TicketFoodDto;
import com.notrika.gympin.common.ticket.ticketFood.param.TicketFoodParam;
import com.notrika.gympin.common.ticket.ticketFood.query.TicketFoodQuery;
import com.notrika.gympin.common.ticket.ticketFood.servie.TicketFoodService;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/TicketFood")
public class TicketFoodControllerImpl implements TicketFoodController {

    @Autowired
    private TicketFoodService ticketFoodService;

    @Override
    public ResponseEntity<TicketFoodDto> add(TicketFoodParam param) {
        return ResponseEntity.ok(ticketFoodService.add(param));
    }

    @Override
    public ResponseEntity<TicketFoodDto> update(TicketFoodParam param) {
        return ResponseEntity.ok(ticketFoodService.update(param));
    }

    @Override
    public ResponseEntity<TicketFoodDto> delete(TicketFoodParam param) {
        return ResponseEntity.ok(ticketFoodService.delete(param));
    }

    @Override
    public ResponseEntity<List<TicketFoodDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(ticketFoodService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<TicketFoodDto> getById(Long id) {
        return ResponseEntity.ok(ticketFoodService.getById(id));
    }

    @Override
    public ResponseEntity<Page<TicketFoodDto>> query(TicketFoodQuery filter) {
        return ResponseEntity.ok(ticketFoodService.query(filter));
    }


}
