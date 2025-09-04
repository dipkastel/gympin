package com.notrika.gympin.common.util.exception.transactions;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class OnlyOneItemCanBeInInvoice extends ExceptionBase{
    public OnlyOneItemCanBeInInvoice() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.ONLY_ONE_ITEM_CAN_BE_IN_INVOICE);
    }
}
