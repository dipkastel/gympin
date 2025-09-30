package com.notrika.gympin.common.util;

import com.notrika.gympin.common.finance.IncreaseCorporateDeposit.param.RequestIncreaseCorporateDepositParam;
import com.notrika.gympin.common.finance.transaction.enums.GatewayType;
import com.notrika.gympin.common.user.user.enums.Gender;

import java.util.*;

public class GeneralUtil {

    public static boolean isGenderCompatible(Gender subscribeGender, Gender userGender) {
        switch (userGender){
            case MALE:{
                return List.of(Gender.MALE,Gender.NONE,Gender.BOYS,Gender.KIDS).contains(subscribeGender);
            }
            case FEMALE:{
                return List.of(Gender.FEMALE,Gender.NONE,Gender.GIRLS,Gender.KIDS).contains(subscribeGender);
            }
        }
        return false;
    }


    public static Long UnifyOrderId(Long orderId){
        Date date = new Date();
        Calendar calendar = GregorianCalendar.getInstance();
        calendar.setTime(date);
        String tme = "";
        tme+=calendar.get(Calendar.HOUR_OF_DAY);
        tme+=calendar.get(Calendar.SECOND);
        while (tme.length()!=4)
            tme += "0";
        return Long.parseLong(orderId.toString()+tme);
    }

    public static Long PureOrderId(Long orderId){
        String newOrderId = orderId.toString();
        newOrderId= newOrderId.substring(0,newOrderId.length()-4);
        return Long.parseLong(newOrderId);
    }

    public static String GetPaymentDescription(GatewayType gatewayType,String transactionRefrence,Date chequeDate) {

        switch (gatewayType){
            case BANK_PORTAL:
                return "پرداخت درگاه پرداخت نباید به صورت درخواست در این قسمت قرار بگیرد ! این پرداخت را تایید نکنید و با مدیر سیستم تماس بگیرید!";
            case CHEQUE:
                return "پرداخت از طریق چک بانکی با شماره سریال : " + transactionRefrence+" و در تاریخ  : " + chequeDate;
            case CARD_TRANSFER:
                return "کارت به کارت بانکی با شماره تراکنش : "+transactionRefrence;
            case BANK_TRANSFER:
                return "تراکنش بانکی با شماره تراکنش : "+ transactionRefrence;
            case ADMIN_PANEL:
                return "پرداخت توسط ادمین پنل : "+ transactionRefrence;
        }
        return "تراکنش را تایید نکنید ! (تراکنش نامشخص)";
    }
}
