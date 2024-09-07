package com.notrika.gympin.common.util.exception.transactions;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class CannotChangeToCompletedInvoicesException extends ExceptionBase{
    public CannotChangeToCompletedInvoicesException() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.CANNOT_CHANGE_TO_COMPLETED_INVOICES_EXCEPTION);
    }
}
