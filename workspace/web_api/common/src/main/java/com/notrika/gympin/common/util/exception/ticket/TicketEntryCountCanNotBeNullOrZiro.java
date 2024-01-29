package com.notrika.gympin.common.util.exception.ticket;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class TicketEntryCountCanNotBeNullOrZiro extends ExceptionBase {
    public TicketEntryCountCanNotBeNullOrZiro() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.TICKET_ENTRY_COUNT_CANNOT_BE_NULL_OR_ZIRO);
    }
}
