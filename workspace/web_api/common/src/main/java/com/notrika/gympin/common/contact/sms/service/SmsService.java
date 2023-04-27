package com.notrika.gympin.common.contact.sms.service;

import com.notrika.gympin.common.contact.sms.dto.SmsDto;

public interface SmsService {

    boolean sendVerificationSms(Long userId, SmsDto smsDto) throws Exception;
    boolean sendJoinedToPlaceSms(SmsDto smsDto) throws Exception;
    boolean sendJoinedToCorporateSms(SmsDto smsDto) throws Exception;
    boolean sendRegisterCompleted(SmsDto smsDto) throws Exception;
    boolean sendLowBudgetToCorporate(SmsDto smsDto) throws Exception;

}
