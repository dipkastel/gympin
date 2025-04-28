package com.notrika.gympin.common.util.exception.corporate;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class CorporateNotFoundException extends ExceptionBase {
    public CorporateNotFoundException() {
        super(HttpStatus.NOT_FOUND, Error.ErrorType.CORPORATE_NOT_FOUND_EXCEPTION);
    }
}
