package com.notrika.gympin.common.util.exception.ticketSubscribe;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class TicketSubscribeEntryCountCanNotBeNullOrZiro extends ExceptionBase {
    public TicketSubscribeEntryCountCanNotBeNullOrZiro() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.TICKET_SUBSCRIBE_ENTRY_COUNT_CANNOT_BE_NULL_OR_ZIRO);
    }
}
