package com.notrika.gympin.common.exception.multimedia;

import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class CreateDirectoryException extends ExceptionBase {
    public CreateDirectoryException() {
        super(HttpStatus.INTERNAL_SERVER_ERROR, Error.ErrorType.COULD_NOT_CREATE_DIRECTORY);
    }

}
