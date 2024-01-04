package com.notrika.gympin.common.purchased.purchased.api;

import com.notrika.gympin.common.purchased.purchased.dto.PurchasedDto;
import com.notrika.gympin.common.purchased.purchased.param.PurchasedParam;
import com.notrika.gympin.common.purchased.purchased.query.PurchasedQuery;
import com.notrika.gympin.common.ticket.buyable.dto.TicketBuyableDto;
import com.notrika.gympin.common.ticket.buyable.param.TicketBuyableParam;
import com.notrika.gympin.common.ticket.buyable.query.TicketBuyableQuery;
import com.notrika.gympin.common.util._base.base.BaseController;
import org.springframework.http.ResponseEntity;

public interface PurchasedController extends BaseController<PurchasedParam, PurchasedDto, PurchasedQuery> {

}
