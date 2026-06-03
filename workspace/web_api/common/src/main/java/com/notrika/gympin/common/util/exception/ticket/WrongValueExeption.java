package com.notrika.gympin.common.util.exception.ticket;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class WrongValueExeption extends ExceptionBase {
    public WrongValueExeption() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.WRONG_VALUE_EXEPTION);
    }
}
