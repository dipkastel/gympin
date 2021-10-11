package com.notrika.gympin.common.util;

import java.util.Locale;
import java.util.ResourceBundle;

public class ErrorMessageHelper {
    public static String getMessage(String message, Language language) {
        String text = "message for error not found";
        try {
            Locale locale = new Locale(language.toString());
            ResourceBundle exampleBundle = ResourceBundle.getBundle("i18n.messages", locale);
            text = exampleBundle.getString(message);
        } catch (Exception e) {
        }
        return text;
    }

    public enum Language {
        fa, en
    }
}
