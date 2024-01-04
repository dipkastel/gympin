package com.notrika.gympin.common.util.exception.place;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class PlaceCommissionIsNotCorrect extends ExceptionBase {
    public PlaceCommissionIsNotCorrect() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.PLACE_COMMISSION_IS_NOT_CORRECT);
    }
}
