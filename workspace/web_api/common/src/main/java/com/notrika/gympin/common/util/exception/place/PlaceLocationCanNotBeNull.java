package com.notrika.gympin.common.util.exception.place;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class PlaceLocationCanNotBeNull extends ExceptionBase {
    public PlaceLocationCanNotBeNull() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.PLACE_LOCATION_CAN_NOT_BENULL);
    }
}
