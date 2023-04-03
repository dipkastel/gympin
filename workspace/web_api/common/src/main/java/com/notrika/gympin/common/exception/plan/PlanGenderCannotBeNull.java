package com.notrika.gympin.common.exception.plan;

import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class PlanGenderCannotBeNull extends ExceptionBase {
    public PlanGenderCannotBeNull() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.PLAN_GENDER_CANNOT_BE_NULL);
    }
}
