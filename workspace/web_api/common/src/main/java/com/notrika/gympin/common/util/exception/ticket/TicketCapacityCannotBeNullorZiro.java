package com.notrika.gympin.common.util.exception.ticket;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class TicketCapacityCannotBeNullorZiro extends ExceptionBase {
    public TicketCapacityCannotBeNullorZiro() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.TICKET_CAPACITY_CANNOT_BE_NULL_OR_ZIRO);
    }
}
