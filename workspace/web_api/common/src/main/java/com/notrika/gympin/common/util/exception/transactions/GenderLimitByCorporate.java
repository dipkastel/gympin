package com.notrika.gympin.common.util.exception.transactions;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class GenderLimitByCorporate extends ExceptionBase{
    public GenderLimitByCorporate() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.GENDER_LIMIT_BY_CORPORATE);
    }
}
