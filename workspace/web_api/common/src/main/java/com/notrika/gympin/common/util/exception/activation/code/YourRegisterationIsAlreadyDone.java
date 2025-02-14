package com.notrika.gympin.common.util.exception.activation.code;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import org.springframework.http.HttpStatus;

public class YourRegisterationIsAlreadyDone extends ExceptionBase {
    public YourRegisterationIsAlreadyDone() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.YOUR_REGISTERATION_IS_ALREADY_DONE);
    }
}
