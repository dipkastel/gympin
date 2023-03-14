package com.notrika.gympin.common.exception.multimedia;

import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class UnsupportedImageType extends ExceptionBase {
    public UnsupportedImageType() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.UNSUPPORTED_IMAGE_TYPE);
    }
}
