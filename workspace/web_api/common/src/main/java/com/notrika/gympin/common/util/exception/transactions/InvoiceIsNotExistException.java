package com.notrika.gympin.common.util.exception.transactions;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class InvoiceIsNotExistException extends ExceptionBase{
    public InvoiceIsNotExistException() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.INVOICE_IS_NOT_EXIST_EXCEPTION);
    }
}
