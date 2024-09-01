package com.notrika.gympin.common.ticket.buyable.api;

import com.notrika.gympin.common.ticket.buyable.dto.TicketBuyableDto;
import com.notrika.gympin.common.ticket.buyable.param.TicketBuyableParam;
import com.notrika.gympin.common.ticket.buyable.query.TicketBuyableQuery;
import com.notrika.gympin.common.util._base.base.BaseController;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface TicketBuyableController extends BaseController<TicketBuyableParam, TicketBuyableDto, TicketBuyableQuery> {

    ResponseEntity<TicketBuyableDto> setTicketBeneficiary(TicketBuyableParam param);
    ResponseEntity<List<TicketBuyableDto>> getWanderers();
}
