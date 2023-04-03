package com.notrika.gympin.common.exception.plan;

import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class PlanTicketCapacityCannotBeNullorZiro extends ExceptionBase {
    public PlanTicketCapacityCannotBeNullorZiro() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.PLAN_TICKET_CAPACITY_CANNOT_BE_NULL_OR_ZIRO);
    }
}
