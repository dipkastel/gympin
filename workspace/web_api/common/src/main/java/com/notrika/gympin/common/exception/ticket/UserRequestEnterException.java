package com.notrika.gympin.common.exception.ticket;

import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class UserRequestEnterException extends ExceptionBase{

    public UserRequestEnterException() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.USER_REQUEST_ENTER);
    }
}
