package com.notrika.gympin.common.exception.event;

import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class NotOwnerOfEventException extends ExceptionBase {
    public NotOwnerOfEventException() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.EVENT_USER_IS_NOT_OWNER);
    }
}
