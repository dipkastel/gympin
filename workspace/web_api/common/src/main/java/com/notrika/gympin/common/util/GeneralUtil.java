package com.notrika.gympin.common.util;

import com.notrika.gympin.common.user.enums.Gender;

import java.util.List;
import java.util.Random;

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
}
