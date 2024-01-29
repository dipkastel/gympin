package com.notrika.gympin.common.util.exception.purchased;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class PriceConflictException extends ExceptionBase{

    public PriceConflictException() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.PRICE_CONFLICT);
    }
}
