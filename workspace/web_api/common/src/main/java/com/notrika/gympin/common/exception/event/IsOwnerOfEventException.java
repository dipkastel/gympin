package com.notrika.gympin.common.exception.event;

import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class IsOwnerOfEventException extends ExceptionBase {

    public IsOwnerOfEventException() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.EVENT_USER_IS_OWNER);
    }
}
