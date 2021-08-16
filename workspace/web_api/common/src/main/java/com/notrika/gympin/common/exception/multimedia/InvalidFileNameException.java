package com.notrika.gympin.common.exception.multimedia;

import com.notrika.gympin.common.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class InvalidFileNameException extends ExceptionBase {
    public InvalidFileNameException() {
    }

    public InvalidFileNameException(HttpStatus httpStatus, Error.ErrorType errorType) {
        super(httpStatus, errorType);
    }

    public InvalidFileNameException(String message, HttpStatus httpStatus, Error.ErrorType errorType) {
        super(message, httpStatus, errorType);
    }

    public InvalidFileNameException(String message, Throwable cause, HttpStatus httpStatus, Error.ErrorType errorType) {
        super(message, cause, httpStatus, errorType);
    }

    public InvalidFileNameException(Throwable cause, HttpStatus httpStatus, Error.ErrorType errorType) {
        super(cause, httpStatus, errorType);
    }

    public InvalidFileNameException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace, HttpStatus httpStatus, Error.ErrorType errorType) {
        super(message, cause, enableSuppression, writableStackTrace, httpStatus, errorType);
    }
}
