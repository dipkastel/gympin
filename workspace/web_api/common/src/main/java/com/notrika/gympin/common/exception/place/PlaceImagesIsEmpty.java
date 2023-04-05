package com.notrika.gympin.common.exception.place;

import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class PlaceImagesIsEmpty extends ExceptionBase {
    public PlaceImagesIsEmpty() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.PLACE_IMAGES_IS_EMPTY);
    }
}
