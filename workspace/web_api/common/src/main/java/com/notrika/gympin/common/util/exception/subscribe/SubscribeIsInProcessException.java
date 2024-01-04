package com.notrika.gympin.common.util.exception.subscribe;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class SubscribeIsInProcessException extends ExceptionBase{

    public SubscribeIsInProcessException() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.SUBSCRIBE_IS_IN_PROCESS);
    }
}
