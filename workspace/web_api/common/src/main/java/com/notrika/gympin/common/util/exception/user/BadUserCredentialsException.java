package com.notrika.gympin.common.util.exception.user;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class BadUserCredentialsException extends ExceptionBase {
    public BadUserCredentialsException() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.BAD_USER_CREDENTIALS_EXCEPTION);
    }
}
