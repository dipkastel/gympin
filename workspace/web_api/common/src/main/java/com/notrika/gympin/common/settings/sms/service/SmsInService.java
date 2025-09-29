package com.notrika.gympin.common.settings.sms.service;

import com.notrika.gympin.common.settings.sms.dto.SmsDto;
import com.notrika.gympin.common.settings.sms.enums.SmsTypes;
import com.notrika.gympin.common.util.exception.general.SmsServiceIsDisabled;

public interface SmsInService {

    boolean sendVerificationSms(Long userId, SmsDto smsDto) throws Exception;
    boolean sendJoinedToPlaceSms(SmsDto smsDto) throws Exception;
    boolean sendJoinedToCorporateSms(SmsDto smsDto) throws Exception;
    boolean sendRegisterCompleted(SmsDto smsDto) throws Exception;
    boolean sendLowBudgetToCorporate(SmsDto smsDto) throws Exception;
    boolean sendUserTransactionComplete(SmsDto smsDto) throws Exception;
    boolean sendCorporateTransactionComplete(SmsDto smsDto) throws Exception;
    boolean sendYouBuySubscribe(SmsDto smsDto) throws Exception;
    boolean sendSupportAnswered(SmsDto smsDto) throws Exception;
    boolean sendYouBuyMultipleSubscribe(SmsDto smsDto) throws Exception;
    boolean sendAdminRoleInCorporate(SmsDto smsDto) throws Exception;
    boolean sendFirstTicketSell(SmsDto smsDto) throws Exception;
    boolean sendOrdinaryTicketSell(SmsDto smsDto) throws Exception;
    boolean sendCloseInvoiceWarning(SmsDto smsDto) throws Exception;
    boolean sendPlaceContractCode(Long placeId,SmsDto smsDto) throws Exception;
    boolean sendCorporateContractCode(Long corporateId,SmsDto smsDto) throws Exception;
    boolean sendUserAddCreditByCorporate(SmsDto smsDto) throws Exception;
    boolean sendYouReserveSubscribe(SmsDto smsDto) throws Exception;
    boolean sendYouReserveWillExpireSoon(SmsDto smsDto) throws Exception;

}
