package com.notrika.gympin.common.util.exception.multimedia;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class InvalidFileNameException extends ExceptionBase {
    public InvalidFileNameException() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.INVALID_FILE_NAME);
    }
}
