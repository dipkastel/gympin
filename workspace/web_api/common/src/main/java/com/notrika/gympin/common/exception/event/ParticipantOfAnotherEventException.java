package com.notrika.gympin.common.exception.event;

import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class ParticipantOfAnotherEventException extends ExceptionBase {
    public ParticipantOfAnotherEventException() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.PARTICIPANT_OF_ANOTHER_EVENT);
    }
}
