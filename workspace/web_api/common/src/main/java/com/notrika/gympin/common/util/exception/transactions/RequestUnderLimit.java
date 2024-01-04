package com.notrika.gympin.common.util.exception.transactions;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class RequestUnderLimit extends ExceptionBase{
    public RequestUnderLimit() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.REQUEST_UNDER_LIMIT);
    }
}
