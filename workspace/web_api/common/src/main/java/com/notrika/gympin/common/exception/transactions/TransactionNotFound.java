package com.notrika.gympin.common.exception.transactions;

import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class TransactionNotFound extends ExceptionBase{
    public TransactionNotFound() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.TRANSACTION_NOT_FOUND);
    }
}
