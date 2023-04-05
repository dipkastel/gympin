package com.notrika.gympin.common.exception.place;

import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class PlaceOptionsIsEmpty extends ExceptionBase {
    public PlaceOptionsIsEmpty() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.PLACE_OPTIONS_IS_EMPTY);
    }
}
