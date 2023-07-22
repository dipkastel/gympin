package com.notrika.gympin.common.exception;

import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class BadRequestRunTimeMessage extends ExceptionBase{
    public BadRequestRunTimeMessage(String message) {
        super(message,HttpStatus.BAD_REQUEST, Error.ErrorType.BAD_REQUEST_RUN_TIME_MESSAGE);
    }
}
