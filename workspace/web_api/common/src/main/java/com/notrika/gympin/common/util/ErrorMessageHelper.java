package com.notrika.gympin.common.util;

import java.util.Locale;
import java.util.ResourceBundle;

public class ErrorMessageHelper {
    public static String getMessage(String message,Language language){
        Locale locale = new Locale(language.toString());
        ResourceBundle exampleBundle = ResourceBundle.getBundle("i18n.messages", locale);
        String text = exampleBundle.getString(message);
        return text;
    }
    public  enum Language{
        fa,en
    }
}
