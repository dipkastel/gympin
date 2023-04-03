package com.notrika.gympin.common.exception.plan;

import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class PlanExpireTypeCannotBeNull extends ExceptionBase {
    public PlanExpireTypeCannotBeNull() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.PLAN_EXPIRE_TYPE_CANNOT_BE_NULL);
    }
}
