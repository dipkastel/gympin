package com.notrika.gympin.common.util.exception.purchased;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class GiftCreditIsNotActiveException extends ExceptionBase{

    public GiftCreditIsNotActiveException() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.GIFT_CREDIT_IS_NOT_ACTIVE_EXCEPTION);
    }
}
