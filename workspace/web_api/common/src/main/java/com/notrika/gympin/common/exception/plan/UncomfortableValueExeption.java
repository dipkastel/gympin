package com.notrika.gympin.common.exception.plan;

import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class UncomfortableValueExeption extends ExceptionBase {
    public UncomfortableValueExeption() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.UNCOMFORTABLE_VALUE_EXEPTION);
    }
}
