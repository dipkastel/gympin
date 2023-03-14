package com.notrika.gympin.common.exception.multimedia;

import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class ImageReadError extends ExceptionBase {
    public ImageReadError() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.IMAGE_READ_ERROR);
    }
}