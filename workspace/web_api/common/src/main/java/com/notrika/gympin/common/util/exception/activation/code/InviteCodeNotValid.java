package com.notrika.gympin.common.util.exception.activation.code;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import org.springframework.http.HttpStatus;

public class InviteCodeNotValid extends ExceptionBase {
    public InviteCodeNotValid() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.INVITE_CODE_NOT_VALID);
    }
}
