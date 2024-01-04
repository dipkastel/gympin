package com.notrika.gympin.common.util.exception.subscribe;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class SubscribeFirstEntryRequestException extends ExceptionBase{

    public SubscribeFirstEntryRequestException() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.SUBSCRIBE_FIRST_ENTRY_REQUEST_EXCEPTION);
    }
}
