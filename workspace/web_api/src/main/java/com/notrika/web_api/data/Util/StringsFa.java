package com.notrika.web_api.data.Util;

import java.util.Locale;
import java.util.ResourceBundle;

public class StringsFa {
    public static String getMessage(int code){
        Locale locale = new Locale("fa");
        ResourceBundle exampleBundle = ResourceBundle.getBundle("i18n.messages", locale);
        String text = exampleBundle.getString("user_already_exist");
        return text;
    }
}
