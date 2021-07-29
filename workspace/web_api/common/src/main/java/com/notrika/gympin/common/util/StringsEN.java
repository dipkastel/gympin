package com.notrika.gympin.common.util;

import java.util.Locale;
import java.util.ResourceBundle;

public class StringsEN {
    public static String getMessage(int code){
        Locale locale = new Locale("en");
        ResourceBundle exampleBundle = ResourceBundle.getBundle("i18n.messages", locale);
        String text = exampleBundle.getString("user_already_exist");
        return text;
    }
}
