package com.notrika.gympin.common.exception.general;

import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class NotFoundException extends ExceptionBase {
    public NotFoundException() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.NOT_FOUND_EXEPTION);
    }
}
