package com.notrika.gympin.common.util.exception.user;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class UserAlreadyRatedThisPlaceException extends ExceptionBase {
    public UserAlreadyRatedThisPlaceException() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.USER_ALREADY_RATED_THIS_PLACE_EXCEPTION);
    }
}
