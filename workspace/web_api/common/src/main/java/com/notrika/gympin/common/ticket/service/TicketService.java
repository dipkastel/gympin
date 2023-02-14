package com.notrika.gympin.common.ticket.service;

import com.notrika.gympin.common._base.base.BaseService;
import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.support.dto.SupportDto;
import com.notrika.gympin.common.support.param.SupportMessageParam;
import com.notrika.gympin.common.support.param.SupportParam;
import com.notrika.gympin.common.ticket.dto.TicketDto;
import com.notrika.gympin.common.ticket.dto.TicketScannedDto;
import com.notrika.gympin.common.ticket.param.*;
import com.notrika.gympin.common.ticket.query.TicketQuery;
import com.notrika.gympin.common.user.param.UserParam;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface TicketService extends BaseService<TicketParam, TicketDto, TicketQuery> {

    List<TicketDto> getByUser(UserParam userParam);
    TicketDto checkout(TicketCheckoutParam param) throws Exception;
    TicketScannedDto scannedTicket(TicketParam param) throws Exception;
    TicketScannedDto acceptEnterRequest(Long ticketId) throws Exception;

    Boolean enterRequest(TicketParam param);

    Boolean exitRequest(Long id);

    List<TicketDto> getEnterRequestedTicket(Long placeId);

    List<TicketScannedDto> getUserEnteredByPlace(Long placeId);

    List<TicketDto> getActiveTicketsOfPlace(Long placeId);

    List<TicketDto> getUserTicketsByPlace(UserTicketsParam param);

    TicketScannedDto addEntryMessage(EntryMessageParam param);

    Boolean deleteEntryMessage(Long messageId);

    Boolean increaseExpireDate(IncreaseExpireParam param);

}
