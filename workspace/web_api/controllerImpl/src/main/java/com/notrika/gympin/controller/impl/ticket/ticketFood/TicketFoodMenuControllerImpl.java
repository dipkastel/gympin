package com.notrika.gympin.controller.impl.ticket.ticketFood;

import com.notrika.gympin.common.ticket.ticketFood.api.TicketFoodController;
import com.notrika.gympin.common.ticket.ticketFood.api.TicketFoodMenuController;
import com.notrika.gympin.common.ticket.ticketFood.dto.TicketFoodDto;
import com.notrika.gympin.common.ticket.ticketFood.dto.TicketFoodMenuDto;
import com.notrika.gympin.common.ticket.ticketFood.param.TicketFoodMenuParam;
import com.notrika.gympin.common.ticket.ticketFood.param.TicketFoodParam;
import com.notrika.gympin.common.ticket.ticketFood.query.TicketFoodMenuQuery;
import com.notrika.gympin.common.ticket.ticketFood.query.TicketFoodQuery;
import com.notrika.gympin.common.ticket.ticketFood.servie.TicketFoodMenuService;
import com.notrika.gympin.common.ticket.ticketFood.servie.TicketFoodService;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Date;
import java.util.List;

@RestController
@RequestMapping("/api/v1/TicketFoodMenu")
public class TicketFoodMenuControllerImpl implements TicketFoodMenuController {

    @Autowired
    private TicketFoodMenuService ticketFoodMenuService;

    @Override
    public ResponseEntity<TicketFoodMenuDto> add(TicketFoodMenuParam param) {
        return ResponseEntity.ok(ticketFoodMenuService.add(param));
    }

    @Override
    public ResponseEntity<TicketFoodMenuDto> update(TicketFoodMenuParam param) {
        return ResponseEntity.ok(ticketFoodMenuService.update(param));
    }

    @Override
    public ResponseEntity<TicketFoodMenuDto> delete(TicketFoodMenuParam param) {
        return ResponseEntity.ok(ticketFoodMenuService.delete(param));
    }

    @Override
    public ResponseEntity<List<TicketFoodMenuDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(ticketFoodMenuService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<TicketFoodMenuDto> getById(Long id) {
        return ResponseEntity.ok(ticketFoodMenuService.getById(id));
    }

    @Override
    public ResponseEntity<Page<TicketFoodMenuDto>> query(TicketFoodMenuQuery filter) {
        return ResponseEntity.ok(ticketFoodMenuService.query(filter));
    }


    @Override
    @GetMapping("getDates")
    public ResponseEntity<List<Date>> getFoodMenuDates(Long cateringId) {
        return ResponseEntity.ok(ticketFoodMenuService.getFoodMenuDates(cateringId));
    }
}
