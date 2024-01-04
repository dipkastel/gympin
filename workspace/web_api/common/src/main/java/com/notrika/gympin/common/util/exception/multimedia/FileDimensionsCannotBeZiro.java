package com.notrika.gympin.common.util.exception.multimedia;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class FileDimensionsCannotBeZiro extends ExceptionBase {
    public FileDimensionsCannotBeZiro() {
        super(HttpStatus.INTERNAL_SERVER_ERROR, Error.ErrorType.FILE_DIMENSIONS_CANNOT_BE_ZIRO);
    }

}
