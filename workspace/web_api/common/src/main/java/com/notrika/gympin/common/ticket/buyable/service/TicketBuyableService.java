package com.notrika.gympin.common.ticket.buyable.service;

import com.notrika.gympin.common.ticket.buyable.dto.TicketBuyableDto;
import com.notrika.gympin.common.ticket.buyable.param.TicketBuyableParam;
import com.notrika.gympin.common.ticket.buyable.query.TicketBuyableQuery;
import com.notrika.gympin.common.util._base.base.BaseService;

public interface TicketBuyableService extends BaseService<TicketBuyableParam, TicketBuyableDto, TicketBuyableQuery> {

    TicketBuyableDto setTicketBeneficiary(TicketBuyableParam param);
}
