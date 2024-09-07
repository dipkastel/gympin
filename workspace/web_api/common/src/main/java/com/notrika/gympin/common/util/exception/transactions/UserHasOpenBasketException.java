package com.notrika.gympin.common.util.exception.transactions;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class UserHasOpenBasketException extends ExceptionBase{
    public UserHasOpenBasketException() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.USER_HAS_OPEN_BASKET_EXCEPTION);
    }
}
