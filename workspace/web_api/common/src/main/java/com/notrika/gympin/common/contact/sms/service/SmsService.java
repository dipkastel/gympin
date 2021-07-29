package com.notrika.gympin.common.contact.sms.service;

import com.notrika.gympin.common.contact.sms.dto.SmsDto;

public interface SmsService {
    boolean sendSms(SmsDto smsDto);
}
