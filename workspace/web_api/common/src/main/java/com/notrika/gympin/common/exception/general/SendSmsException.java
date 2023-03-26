package com.notrika.gympin.common.exception.general;

import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class SendSmsException extends ExceptionBase {
    public SendSmsException() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.SEND_SMS_EXCEPTION);
    }
}
