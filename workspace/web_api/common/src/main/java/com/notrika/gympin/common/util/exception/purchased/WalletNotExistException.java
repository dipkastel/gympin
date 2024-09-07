package com.notrika.gympin.common.util.exception.purchased;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class WalletNotExistException extends ExceptionBase{

    public WalletNotExistException() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.WALLET_NOT_EXIST_EXCEPTION);
    }
}
