package com.notrika.gympin.common.exception;

import com.notrika.gympin.common.Error;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@Data
@EqualsAndHashCode(callSuper = true)
public class ExceptionBase extends Exception {
    private HttpStatus httpStatus;
    private Error.ErrorType errorType;

    public ExceptionBase(HttpStatus httpStatus, Error.ErrorType errorType) {
        this.httpStatus = httpStatus;
        this.errorType = errorType;
    }

    public ExceptionBase(String message, HttpStatus httpStatus, Error.ErrorType errorType) {
        super(message);
        this.httpStatus = httpStatus;
        this.errorType = errorType;
    }

    public ExceptionBase(String message, Throwable cause, HttpStatus httpStatus, Error.ErrorType errorType) {
        super(message, cause);
        this.httpStatus = httpStatus;
        this.errorType = errorType;
    }

    public ExceptionBase(Throwable cause, HttpStatus httpStatus, Error.ErrorType errorType) {
        super(cause);
        this.httpStatus = httpStatus;
        this.errorType = errorType;
    }

    public ExceptionBase(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace, HttpStatus httpStatus, Error.ErrorType errorType) {
        super(message, cause, enableSuppression, writableStackTrace);
        this.httpStatus = httpStatus;
        this.errorType = errorType;
    }
}
