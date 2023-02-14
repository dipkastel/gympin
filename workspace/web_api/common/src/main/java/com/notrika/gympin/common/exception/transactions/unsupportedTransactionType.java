package com.notrika.gympin.common.exception.transactions;

import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class unsupportedTransactionType extends ExceptionBase{
    public unsupportedTransactionType() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.UNSUPPORTED_TRANSACTION_TYPE);
    }
}
