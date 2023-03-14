package com.notrika.gympin.common.exception.multimedia;

import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class MediaTypeNotFound extends ExceptionBase {
    public MediaTypeNotFound() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.MEDIA_TYPE_NOT_FOUND);
    }
}
