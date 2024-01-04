package com.notrika.gympin.common.util.exception.multimedia;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class MultimediaNotFoundException extends ExceptionBase {


    public MultimediaNotFoundException() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.MULTIMEDIA_NOT_FOUND_EXCEPTION);
    }
}
