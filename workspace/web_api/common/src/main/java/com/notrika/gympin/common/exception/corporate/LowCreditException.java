package com.notrika.gympin.common.exception.corporate;

import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class LowCreditException extends ExceptionBase {
    public LowCreditException() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.LOW_CREDIT_EXCEPTION);
    }
}
