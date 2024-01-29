package com.notrika.gympin.common.util.exception.purchased;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class GenderIsNotCompatible extends ExceptionBase{

    public GenderIsNotCompatible() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.GENDER_IS_NOT_COMPATIBLE);
    }
}
