package com.notrika.gympin.common.exception.plan;

import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class PlanNameCannotBeNull extends ExceptionBase {
    public PlanNameCannotBeNull() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.PLAN_NAME_CANNOT_BE_NULL);
    }
}
