package com.notrika.gympin.common.exception.multimedia;

import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class ImageSaveError extends ExceptionBase {
    public ImageSaveError() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.IMAGE_SAVE_ERROR);
    }
}
