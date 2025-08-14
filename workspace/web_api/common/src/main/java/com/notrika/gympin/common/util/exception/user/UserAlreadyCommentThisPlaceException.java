package com.notrika.gympin.common.util.exception.user;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class UserAlreadyCommentThisPlaceException extends ExceptionBase {
    public UserAlreadyCommentThisPlaceException() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.USER_ALREADY_COMMENT_THIS_PLACE_EXCEPTION);
    }
}
