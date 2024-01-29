package com.notrika.gympin.common.util.exception.ticket;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class TicketExpireDateCannotBeNull extends ExceptionBase {
    public TicketExpireDateCannotBeNull() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.TICKET_EXPIRE_DATE_CANNOT_BE_NULL);
    }
}
