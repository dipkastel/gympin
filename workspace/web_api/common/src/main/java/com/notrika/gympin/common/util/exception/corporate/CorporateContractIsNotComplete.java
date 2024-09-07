package com.notrika.gympin.common.util.exception.corporate;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class CorporateContractIsNotComplete extends ExceptionBase {
    public CorporateContractIsNotComplete() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.CORPORATE_CONTRACT_IS_NOT_COMPLETE);
    }
}
