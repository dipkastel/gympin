package com.notrika.gympin.common.util.exception.general;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class SmsServiceIsDisabled extends ExceptionBase {
    public SmsServiceIsDisabled() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.SMS_SERVICE_IS_DISABLED);
    }
}
