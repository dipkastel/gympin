package com.notrika.gympin.common.util.exception.purchased;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class PurchasedExpiredException extends ExceptionBase{
    public PurchasedExpiredException() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.PURCHASED_EXPIRED);
    }
}
