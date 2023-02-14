package com.notrika.gympin.common.ticket.api;

import com.notrika.gympin.common._base.base.BaseController;
import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.place.place.dto.PlaceDto;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.support.dto.SupportDto;
import com.notrika.gympin.common.support.param.SupportMessageParam;
import com.notrika.gympin.common.support.param.SupportParam;
import com.notrika.gympin.common.ticket.dto.TicketDto;
import com.notrika.gympin.common.ticket.dto.TicketScannedDto;
import com.notrika.gympin.common.ticket.param.*;
import com.notrika.gympin.common.ticket.query.TicketQuery;
import com.notrika.gympin.common.user.param.UserParam;
import org.springframework.http.ResponseEntity;

import java.util.List;


public interface TicketController extends BaseController<TicketParam, TicketDto, TicketQuery> {

    ResponseEntity<List<TicketDto>> getByUser(UserParam userParam);
    ResponseEntity<TicketDto> checkout(TicketCheckoutParam param) throws Exception;
    ResponseEntity<TicketScannedDto> scannedTicket(TicketParam param) throws Exception;
    ResponseEntity<TicketScannedDto> acceptEnterRequested(Long TicketId) throws Exception;
    ResponseEntity<List<TicketDto>> getUserTicketsByPlace(UserTicketsParam param) throws Exception;
    ResponseEntity<List<TicketDto>> getEnterRequestedTicket(Long placeId);
    ResponseEntity<List<TicketDto>> getActiveTicketsOfPlace(Long placeId);
    ResponseEntity<List<TicketScannedDto>> getUserEnteredTicket(Long placeId);
    //messages
    ResponseEntity<TicketScannedDto> addEntryMessage(EntryMessageParam param);
    ResponseEntity<Boolean> deleteEntryMessage(Long messageId);
    //enter
    ResponseEntity<Boolean> enterRequest(TicketParam param) throws Exception;
    ResponseEntity<Boolean> exitRequest(Long Id) throws Exception;
    ResponseEntity<Boolean> increaseExpireDate(IncreaseExpireParam param) throws Exception;
}
