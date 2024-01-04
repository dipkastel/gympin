package com.notrika.gympin.common.util.exception;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
public class ExceptionBase extends RuntimeException {
    private HttpStatus httpStatus;
    private Error.ErrorType errorType;
    private int errorCode;
    private String errorMessage;

    private ExceptionBase(){
    }

    public ExceptionBase(HttpStatus httpStatus, Error.ErrorType errorType) {
        this.httpStatus = httpStatus;
        this.errorType = errorType;
    }

    public ExceptionBase(String message, HttpStatus httpStatus, Error.ErrorType errorType) {
        super(message);
        this.errorMessage = message;
        this.httpStatus = httpStatus;
        this.errorType = errorType;
    }

    public ExceptionBase(String message, Throwable cause, HttpStatus httpStatus, Error.ErrorType errorType) {
        super(message, cause);
        this.errorMessage = message;
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
        this.errorMessage = message;
        this.httpStatus = httpStatus;
        this.errorType = errorType;
    }
}
