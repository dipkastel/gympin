package com.notrika.gympin.common.util;

import com.notrika.gympin.common.user.enums.Gender;

import java.util.*;

public class GeneralUtil {

    public static boolean isGenderCompatible(Gender ticketGender, Gender userGender) {
        switch (userGender){
            case MALE:{
                return List.of(Gender.MALE,Gender.NONE,Gender.BOYS,Gender.KIDS).contains(ticketGender);
            }
            case FEMALE:{
                return List.of(Gender.FEMALE,Gender.NONE,Gender.GIRLS,Gender.KIDS).contains(ticketGender);
            }
        }
        return false;
    }


    public static Long UnifyOrderId(Long orderId){
        Date date = new Date();
        Calendar calendar = GregorianCalendar.getInstance();
        calendar.setTime(date);
        String newOrderId = orderId.toString();
        newOrderId+=calendar.get(Calendar.HOUR_OF_DAY);
        newOrderId+=calendar.get(Calendar.SECOND);
        return Long.parseLong(newOrderId);
    }

    public static Long PureOrderId(Long orderId){
        String newOrderId = orderId.toString();
        newOrderId= newOrderId.substring(0,newOrderId.length()-4);
        return Long.parseLong(newOrderId);
    }
}
