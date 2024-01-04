package com.notrika.gympin.common.util.exception.activation.code;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import org.springframework.http.HttpStatus;

public class ActivationCodeExpiredException extends ExceptionBase {
    public ActivationCodeExpiredException() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.ACTIVATION_CODE_EXPIRED);
    }
}
