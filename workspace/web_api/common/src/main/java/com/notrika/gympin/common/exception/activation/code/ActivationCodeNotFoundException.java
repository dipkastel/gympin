package com.notrika.gympin.common.exception.activation.code;

import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import org.springframework.http.HttpStatus;

public class ActivationCodeNotFoundException extends ExceptionBase {
    public ActivationCodeNotFoundException() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.ACTIVATION_CODE_NOT_FOUND);
    }
}
