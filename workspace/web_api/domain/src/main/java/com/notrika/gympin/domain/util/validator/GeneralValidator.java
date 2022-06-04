package com.notrika.gympin.domain.util.validator;

import com.notrika.gympin.common.BaseParam;
import com.notrika.gympin.common.exception.ExceptionBase;
import com.notrika.gympin.common.exception.general.InputNotValidException;
import com.notrika.gympin.common.user.param.UserParam;
import lombok.NonNull;
import org.apache.commons.lang3.StringUtils;

public final class GeneralValidator {

    public static boolean validateId(@NonNull BaseParam<?> param) {
        return param.getId() != null && param.getId() > 0;
    }

    public static void idValidator(@NonNull BaseParam<?> param) {
        if (param.getId() == null || param.getId() <= 0) {
            throw new InputNotValidException();
        }
    }

    public static boolean validateUser(@NonNull BaseParam<? extends UserParam> param) {
        return validateId(param) || (StringUtils.isNotEmpty(param.getObject().getUsername()));
    }

}
