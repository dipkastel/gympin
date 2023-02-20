package com.notrika.gympin.common.exception.transactions;

import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class unknownPaymentType extends ExceptionBase{
    public unknownPaymentType() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.UNKNOWN_PAYMENT_TYPE);
    }
}