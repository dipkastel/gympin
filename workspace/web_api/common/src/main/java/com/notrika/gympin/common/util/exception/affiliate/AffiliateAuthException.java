package com.notrika.gympin.common.util.exception.affiliate;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class AffiliateAuthException extends ExceptionBase {
    public AffiliateAuthException() {
        super(HttpStatus.UNAUTHORIZED, Error.ErrorType.AFFILIATE_AUTH_EXCEPTION);
    }
}
