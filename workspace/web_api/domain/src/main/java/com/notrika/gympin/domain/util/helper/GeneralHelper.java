package com.notrika.gympin.domain.util.helper;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Objects;

public final class GeneralHelper {

    public static <T> T requireNonNull(T obj, String parameterName) {
        if (obj == null) {
            throw new NullPointerException(parameterName + "IS NULL!O_o!");
        }
        return obj;
    }

    public static <T> T requireNonNull(T obj) {
        return Objects.requireNonNull(obj);
    }


    public static Date calcDateByDiff(Date baseDate, int diff, int field) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(field, diff);
        return calendar.getTime();
    }
    public static String fixPhoneNumber(String phonenumber) {
        if(phonenumber.startsWith("9"))
            phonenumber = "0"+phonenumber;
        if(phonenumber.startsWith("+98"))
            phonenumber = phonenumber.replace("+98","0");
        return phonenumber;
    }

}
