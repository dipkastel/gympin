package com.notrika.gympin.common.settings.sms.service;

import com.notrika.gympin.common.settings.sms.dto.SmsDto;

public interface SmsService {

    boolean sendVerificationSms(Long userId, SmsDto smsDto) throws Exception;
    boolean sendJoinedToPlaceSms(SmsDto smsDto) throws Exception;
    boolean sendJoinedToCorporateSms(SmsDto smsDto) throws Exception;
    boolean sendRegisterCompleted(SmsDto smsDto) throws Exception;
    boolean sendLowBudgetToCorporate(SmsDto smsDto) throws Exception;
    boolean sendUserTransactionComplete(SmsDto smsDto) throws Exception;
    boolean sendCorporateTransactionComplete(SmsDto smsDto) throws Exception;
    boolean sendYouBuySubscribe(SmsDto smsDto) throws Exception;
    boolean sendSupportAnswered(SmsDto smsDto) throws Exception;

}
