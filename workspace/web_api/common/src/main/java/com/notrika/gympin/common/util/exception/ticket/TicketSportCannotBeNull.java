package com.notrika.gympin.common.util.exception.ticket;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class TicketSportCannotBeNull extends ExceptionBase {
    public TicketSportCannotBeNull() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.TICKET_SPORTS_CANNOT_BE_NULL);
    }
}
