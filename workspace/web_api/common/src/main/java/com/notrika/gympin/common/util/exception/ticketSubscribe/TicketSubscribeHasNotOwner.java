package com.notrika.gympin.common.util.exception.ticketSubscribe;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class TicketSubscribeHasNotOwner extends ExceptionBase {
    public TicketSubscribeHasNotOwner() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.TICKET_SUBSCRIBE_HAS_NOT_OWNER);
    }
}
