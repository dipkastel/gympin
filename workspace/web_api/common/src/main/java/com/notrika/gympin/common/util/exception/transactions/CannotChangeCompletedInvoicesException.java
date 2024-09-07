package com.notrika.gympin.common.util.exception.transactions;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class CannotChangeCompletedInvoicesException extends ExceptionBase{
    public CannotChangeCompletedInvoicesException() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.CANNOT_CHANGE_COMPLETED_INVOICES_EXCEPTION);
    }
}
