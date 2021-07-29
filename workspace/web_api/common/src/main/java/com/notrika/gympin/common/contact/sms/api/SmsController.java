package com.notrika.gympin.common.contact.sms.api;

import com.notrika.gympin.common.contact.sms.enums.SmsTypes;

public interface SmsController {

    boolean sendSms(String UserNumber, SmsTypes smsType, String... params);
}
