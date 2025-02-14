package com.notrika.gympin.common.util.exception.purchased;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class GiftCreditUserNotSetException extends ExceptionBase{

    public GiftCreditUserNotSetException() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.GIFT_CREDIT_USER_NOT_SET_EXCEPTION);
    }
}
