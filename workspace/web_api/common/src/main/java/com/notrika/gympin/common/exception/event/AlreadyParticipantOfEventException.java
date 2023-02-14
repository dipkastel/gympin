package com.notrika.gympin.common.exception.event;

import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class AlreadyParticipantOfEventException extends ExceptionBase {
    public AlreadyParticipantOfEventException() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.ALREADY_PARTICIPANT_OF_EVENT);
    }
}
