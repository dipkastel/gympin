package com.notrika.gympin.common.exception.place;

import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class PlacePlansCanNotBeEmpty extends ExceptionBase {
    public PlacePlansCanNotBeEmpty() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.PLACE_PLANS_CAN_NOT_BE_EMPTY);
    }
}
