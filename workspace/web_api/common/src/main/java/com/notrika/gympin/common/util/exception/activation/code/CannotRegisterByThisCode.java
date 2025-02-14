package com.notrika.gympin.common.util.exception.activation.code;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import org.springframework.http.HttpStatus;

public class CannotRegisterByThisCode extends ExceptionBase {
    public CannotRegisterByThisCode() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.CANNOT_REGISTER_BY_THIS_CODE);
    }
}
