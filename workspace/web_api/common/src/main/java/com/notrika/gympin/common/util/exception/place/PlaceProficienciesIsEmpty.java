package com.notrika.gympin.common.util.exception.place;

import com.notrika.gympin.common.util.exception.Error;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
public class PlaceProficienciesIsEmpty extends ExceptionBase {
    public PlaceProficienciesIsEmpty() {
        super(HttpStatus.BAD_REQUEST, Error.ErrorType.PLACE_PROFICIENCIES_IS_EMPTY);
    }
}
