package com.notrika.gympin.common.util.exception.user;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class UserHasOpenSettlementRequest extends ExceptionBase {
    public UserHasOpenSettlementRequest() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.USER_HAS_OPEN_SETTLEMENT_REQUEST);
    }
}
