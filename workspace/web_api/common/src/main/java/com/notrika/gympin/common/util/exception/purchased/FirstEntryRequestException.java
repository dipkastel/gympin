package com.notrika.gympin.common.util.exception.purchased;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class FirstEntryRequestException extends ExceptionBase{

    public FirstEntryRequestException() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.FIRST_ENTRY_REQUEST_EXCEPTION);
    }
}
