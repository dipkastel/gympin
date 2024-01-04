package com.notrika.gympin.common.util.exception.ticketSubscribe;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class TicketSubscribeExpireTypeCannotBeNull extends ExceptionBase {
    public TicketSubscribeExpireTypeCannotBeNull() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.TICKET_SUBSCRIBE_EXPIRE_TYPE_CANNOT_BE_NULL);
    }
}
