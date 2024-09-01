package com.notrika.gympin.common.util.exception.corporate;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class CreditCannotBeNegativeException extends ExceptionBase {
    public CreditCannotBeNegativeException() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.CREDIT_CANNOT_BE_NEGATIVE_EXCEPTION);
    }
}
