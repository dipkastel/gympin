package com.notrika.gympin.common.util.exception.affiliate;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class AffiliatorHasNotThisCorporateException extends ExceptionBase {
    public AffiliatorHasNotThisCorporateException() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.AFFILIATOR_HAS_NOT_THIS_CORPORATE_EXCEPTION);
    }
}
