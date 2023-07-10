package com.notrika.gympin.common.exception.transactions;

import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class GatewayIsNotAvalable extends ExceptionBase{
    public GatewayIsNotAvalable() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.GATEWAY_IS_NOT_AVALABLE);
    }
}
