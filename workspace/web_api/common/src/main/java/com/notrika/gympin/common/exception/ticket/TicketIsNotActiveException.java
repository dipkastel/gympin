package com.notrika.gympin.common.exception.ticket;

import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class TicketIsNotActiveException extends ExceptionBase{

    public TicketIsNotActiveException() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.TICKET_IS_NOT_ACTIVE);
    }
}
