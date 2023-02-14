package com.notrika.gympin.common.exception.event;

import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class ParticipantsCountLimitException extends ExceptionBase {
    public ParticipantsCountLimitException() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.PARTICIPANTS_COUNT_LIMIT_EXCEPTION);
    }
}
