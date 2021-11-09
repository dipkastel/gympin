package com.notrika.gympin.common.exception.activation.code;

import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import org.springframework.http.HttpStatus;

public class ActivationCodeManyRequestException extends ExceptionBase {
    public ActivationCodeManyRequestException() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.ACTIVATION_CODE_MANY_REQUEST);
    }
}
