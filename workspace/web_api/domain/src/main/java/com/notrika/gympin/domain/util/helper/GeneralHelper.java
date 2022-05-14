package com.notrika.gympin.domain.util.helper;

import java.util.Objects;

public final class GeneralHelper {

    public static <T> T requireNonNull(T obj,String parameterName) {
        if (obj == null) {
            throw new NullPointerException(parameterName + "IS NULL!O_o!");
        }
        return obj;
    }

    public static <T> T requireNonNull(T obj) {
       return Objects.requireNonNull(obj);
    }

}
