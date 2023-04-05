package com.notrika.gympin.common.exception.place;

import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class PlaceLocationMustSelectOnMap extends ExceptionBase {
    public PlaceLocationMustSelectOnMap() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.PLACE_LOCATION_MUST_SELECT_ON_MAP);
    }
}
