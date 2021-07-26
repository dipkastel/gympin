package com.notrika.web_api.services.sms;

import org.springframework.stereotype.Service;

public interface SmsManager {
    boolean sendSms(String UserNumber, SmsTypes smsType, String... params);
}
