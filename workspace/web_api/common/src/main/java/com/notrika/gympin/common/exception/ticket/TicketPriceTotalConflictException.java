package com.notrika.gympin.common.exception.ticket;

import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class TicketPriceTotalConflictException extends ExceptionBase{

    public TicketPriceTotalConflictException() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.TICKET_PRICE_TOTAL_CONFLICT);
    }
}
