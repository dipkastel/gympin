package com.notrika.gympin.common.util.exception.transactions;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class CheckoutHasNotTypeException extends ExceptionBase{
    public CheckoutHasNotTypeException() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.CHECKOUT_HAS_NOT_TYPE_EXCEPTION);
    }
}
