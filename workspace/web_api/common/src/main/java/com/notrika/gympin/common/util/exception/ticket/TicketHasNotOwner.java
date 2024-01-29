package com.notrika.gympin.common.util.exception.ticket;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class TicketHasNotOwner extends ExceptionBase {
    public TicketHasNotOwner() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.TICKET_HAS_NOT_OWNER);
    }
}
