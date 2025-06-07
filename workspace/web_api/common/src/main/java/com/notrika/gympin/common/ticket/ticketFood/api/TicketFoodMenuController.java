package com.notrika.gympin.common.ticket.ticketFood.api;

import com.notrika.gympin.common.ticket.ticketFood.dto.TicketFoodMenuDto;
import com.notrika.gympin.common.ticket.ticketFood.param.TicketFoodMenuCopyParam;
import com.notrika.gympin.common.ticket.ticketFood.param.TicketFoodMenuParam;
import com.notrika.gympin.common.ticket.ticketFood.query.TicketFoodMenuQuery;
import com.notrika.gympin.common.util._base.base.BaseController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.sql.Date;
import java.util.List;

public interface TicketFoodMenuController extends BaseController<TicketFoodMenuParam, TicketFoodMenuDto, TicketFoodMenuQuery> {



    ResponseEntity<List<Date>> getFoodMenuDates(Long cateringId);
    ResponseEntity<Boolean> copyDate(@RequestBody TicketFoodMenuCopyParam param);

}
