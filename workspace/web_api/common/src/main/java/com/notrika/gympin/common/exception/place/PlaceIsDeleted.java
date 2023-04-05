package com.notrika.gympin.common.exception.place;

import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class PlaceIsDeleted extends ExceptionBase {
    public PlaceIsDeleted() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.PLACE_IS_DELETED);
    }
}
