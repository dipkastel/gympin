package com.notrika.gympin.common.util.exception.user;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class UserPhoneNumberRequiredException extends ExceptionBase {
    public UserPhoneNumberRequiredException() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.USER_PHONENUMBER_REQUIRED_EXCEPTION);
    }
}
