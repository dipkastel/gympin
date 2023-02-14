package com.notrika.gympin.common.exception.ticket;

import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class TicketUsageLimitException extends ExceptionBase{

    public TicketUsageLimitException() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.TICKET_USAGE_LIMIT);
    }
}
