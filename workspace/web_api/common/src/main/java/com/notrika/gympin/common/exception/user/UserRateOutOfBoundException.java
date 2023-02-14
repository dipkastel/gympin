package com.notrika.gympin.common.exception.user;

import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class UserRateOutOfBoundException extends ExceptionBase {
    public UserRateOutOfBoundException() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.USER_RATE_OUT_OF_BOUND);
    }
}
