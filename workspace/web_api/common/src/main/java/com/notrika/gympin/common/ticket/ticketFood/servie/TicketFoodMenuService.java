package com.notrika.gympin.common.ticket.ticketFood.servie;

import com.notrika.gympin.common.ticket.buyable.dto.TicketBuyableDto;
import com.notrika.gympin.common.ticket.ticketFood.dto.TicketFoodDto;
import com.notrika.gympin.common.ticket.ticketFood.dto.TicketFoodMenuDto;
import com.notrika.gympin.common.ticket.ticketFood.param.TicketFoodMenuParam;
import com.notrika.gympin.common.ticket.ticketFood.param.TicketFoodParam;
import com.notrika.gympin.common.ticket.ticketFood.query.TicketFoodMenuQuery;
import com.notrika.gympin.common.ticket.ticketFood.query.TicketFoodQuery;
import com.notrika.gympin.common.util._base.base.BaseService;

import java.sql.Date;
import java.util.List;

public interface TicketFoodMenuService extends BaseService<TicketFoodMenuParam, TicketFoodMenuDto, TicketFoodMenuQuery> {

    List<Date> getFoodMenuDates(Long cateringId);
}
