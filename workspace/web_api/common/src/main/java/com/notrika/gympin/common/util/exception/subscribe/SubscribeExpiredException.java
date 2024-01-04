package com.notrika.gympin.common.util.exception.subscribe;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class SubscribeExpiredException extends ExceptionBase{
    public SubscribeExpiredException() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.SUBSCRIBE_EXPIRED);
    }
}
