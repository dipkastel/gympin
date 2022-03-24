package com.notrika.gympin.common.util;

import java.util.Random;

public class MyRandom {
    public static String GenerateRandomVerificationSmsCode() {
        Random rand = new Random();
        System.out.println("Rand numb...");
        int resRandom = rand.nextInt((9999 - 1000) + 1) + 1000;
        return resRandom + "";
    }
}
