package com.notrika.gympin.common.util.exception.general;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class FunctionNotAvalable extends ExceptionBase {
    public FunctionNotAvalable() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.FUNCTION_NOT_AVALABLE);
    }
}
