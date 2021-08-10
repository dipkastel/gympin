package com.notrika.gympin.common.contact.sms.service;

import com.notrika.gympin.common.contact.sms.dto.SmsDto;

public interface SmsService {
    boolean sendVerificationSms(Long userId,SmsDto smsDto) throws Exception;

    String getLastCode(Long id);
}
