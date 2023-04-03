package com.notrika.gympin.common.exception.plan;

import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class PlanPriceCannotBeNull extends ExceptionBase {
    public PlanPriceCannotBeNull() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.PLAN_PRICE_CANNOT_BE_NULL);
    }
}
