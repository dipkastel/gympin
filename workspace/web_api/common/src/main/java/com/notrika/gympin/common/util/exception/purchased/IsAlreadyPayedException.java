package com.notrika.gympin.common.util.exception.purchased;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class IsAlreadyPayedException extends ExceptionBase{

    public IsAlreadyPayedException() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.IS_ALREADY_PAYED);
    }
}
