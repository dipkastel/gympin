package com.notrika.gympin.common.exception.plan;

import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class PlanEntryCountCanNotBeNullOrZiro extends ExceptionBase {
    public PlanEntryCountCanNotBeNullOrZiro() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.PLAN_ENTRY_COUNT_CANNOT_BE_NULL_OR_ZIRO);
    }
}
