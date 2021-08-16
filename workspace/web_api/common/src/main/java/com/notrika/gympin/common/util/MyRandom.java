package com.notrika.gympin.common.util;

import java.util.Random;

public class MyRandom {
    public static String GenerateRandomVerificationSmsCode() {
        Random rand = new Random();
        System.out.println("Rand numb...");
        int resRandom = rand.nextInt((9999 - 100) + 1) + 10;
        return resRandom + "";
    }
}
