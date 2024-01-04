package com.notrika.gympin.common.util.exception.subscribe;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class SubscribeUsageLimitException extends ExceptionBase{

    public SubscribeUsageLimitException() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.SUBSCRIBE_USAGE_LIMIT);
    }
}
