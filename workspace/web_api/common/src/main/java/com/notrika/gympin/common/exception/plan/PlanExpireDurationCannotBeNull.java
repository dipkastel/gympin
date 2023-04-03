package com.notrika.gympin.common.exception.plan;

import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class PlanExpireDurationCannotBeNull extends ExceptionBase {
    public PlanExpireDurationCannotBeNull() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.PLAN_EXPIRE_DURATION_CANNOT_BE_NULL);
    }
}
