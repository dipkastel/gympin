package com.notrika.gympin.common.exception.transactions;

import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class unknownTransactionType extends ExceptionBase{
    public unknownTransactionType() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.UNKNOWN_TRANSACTION_TYPE);
    }
}
