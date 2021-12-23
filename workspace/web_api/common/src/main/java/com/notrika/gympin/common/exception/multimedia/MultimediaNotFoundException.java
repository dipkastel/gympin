package com.notrika.gympin.common.exception.multimedia;

import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class MultimediaNotFoundException extends ExceptionBase {

    public MultimediaNotFoundException() {
    }

    public MultimediaNotFoundException(HttpStatus httpStatus, Error.ErrorType errorType) {
        super(httpStatus, errorType);
    }

    public MultimediaNotFoundException(String message, HttpStatus httpStatus, Error.ErrorType errorType) {
        super(message, httpStatus, errorType);
    }

    public MultimediaNotFoundException(String message, Throwable cause, HttpStatus httpStatus, Error.ErrorType errorType) {
        super(message, cause, httpStatus, errorType);
    }

    public MultimediaNotFoundException(Throwable cause, HttpStatus httpStatus, Error.ErrorType errorType) {
        super(cause, httpStatus, errorType);
    }

    public MultimediaNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace, HttpStatus httpStatus, Error.ErrorType errorType) {
        super(message, cause, enableSuppression, writableStackTrace, httpStatus, errorType);
    }
}
