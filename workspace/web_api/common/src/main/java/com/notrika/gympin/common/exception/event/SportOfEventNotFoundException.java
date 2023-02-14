package com.notrika.gympin.common.exception.event;

import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class SportOfEventNotFoundException extends ExceptionBase {
    public SportOfEventNotFoundException() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.SPORT_OF_EVENT_NOT_FOUND);
    }
}
