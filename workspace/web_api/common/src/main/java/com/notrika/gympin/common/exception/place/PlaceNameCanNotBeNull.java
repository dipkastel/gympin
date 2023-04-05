package com.notrika.gympin.common.exception.place;

import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class PlaceNameCanNotBeNull extends ExceptionBase {
    public PlaceNameCanNotBeNull() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.PLACE_NAME_CAN_NOT_BE_NULL);
    }
}
