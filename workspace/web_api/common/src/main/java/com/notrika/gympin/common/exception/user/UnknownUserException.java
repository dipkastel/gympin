package com.notrika.gympin.common.exception.user;

import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class UnknownUserException extends ExceptionBase {
    public UnknownUserException() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.UNKNOWN_USER);
    }
}
