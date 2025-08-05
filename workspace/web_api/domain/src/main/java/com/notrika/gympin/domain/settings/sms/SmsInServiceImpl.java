package com.notrika.gympin.domain.settings.sms;

import com.notrika.gympin.common.settings.base.dto.SettingDto;
import com.notrika.gympin.common.settings.base.service.SettingsService;
import com.notrika.gympin.common.settings.sms.dto.SmsDto;
import com.notrika.gympin.common.settings.sms.enums.SmsStatus;
import com.notrika.gympin.common.settings.sms.enums.SmsTypes;
import com.notrika.gympin.common.settings.sms.service.SmsInService;
import com.notrika.gympin.common.util.exception.general.SmsServiceIsDisabled;
import com.notrika.gympin.domain.user.UserServiceImpl;
import com.notrika.gympin.persistence.dao.repository.authCodes.CorporateContractCodeRepository;
import com.notrika.gympin.persistence.dao.repository.authCodes.PlaceContractCodeRepository;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporateRepository;
import com.notrika.gympin.persistence.dao.repository.place.PlaceGymRepository;
import com.notrika.gympin.persistence.dao.repository.place.PlaceRepository;
import com.notrika.gympin.persistence.dao.repository.settings.ManageSmsPatternRepository;
import com.notrika.gympin.persistence.dao.repository.settings.ManageSmsRepository;
import com.notrika.gympin.persistence.dao.repository.authCodes.UserActivationCodeRepository;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
import com.notrika.gympin.persistence.entity.management.sms.ManageSmsEntity;
import com.notrika.gympin.persistence.entity.management.sms.ManageSmsPatternEntity;
import com.notrika.gympin.persistence.entity.place.PlaceGymEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import com.notrika.gympin.persistence.entity.authCodes.CorporateContractCodeEntity;
import com.notrika.gympin.persistence.entity.authCodes.PlaceContractCodeEntity;
import com.notrika.gympin.persistence.entity.authCodes.UserActivationCodeEntity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Calendar;
import java.util.Date;

@Slf4j
@Service
public class SmsInServiceImpl implements SmsInService {


    @Autowired
    private UserActivationCodeRepository userActivationCodeRepository;

    @Autowired
    private PlaceContractCodeRepository placeContractCodeRepository;

    @Autowired
    private CorporateContractCodeRepository corporateContractCodeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private SettingsService settingsService;

    @Autowired
    private PlaceGymRepository placeGymRepository;

    @Autowired
    private CorporateRepository corporateRepository;

    @Autowired
    private ManageSmsRepository manageSmsRepository;

    @Autowired
    private ManageSmsPatternRepository manageSmsPatternRepository;


    @Transactional
    @Override
    public boolean sendVerificationSms(Long userId, SmsDto smsDto) throws Exception {
        log.info("Going to sendVerificationSms params: {} || {}...\n", userId, smsDto);

        if (canSendSms())
            throw new SmsServiceIsDisabled();

        if(sendToFixNumber()){
            smsDto.setUserNumber(getFixNumber().getValue());
        }
        updateUserLoginCode(smsDto.getText1(), userId, "not send");
        insertSendRequest(smsDto,"FARAZ_SMS_PATTERN_SENDCODE",SmsTypes.CODE_TO_VERIFICATION);
        return true;
    }

    @Transactional
    @Override
    public boolean sendJoinedToPlaceSms(SmsDto smsDto) throws Exception {
        log.info("Going to sendJoinedToPlaceSms with params: {} ...\n", smsDto);

        if (canSendSms())
            throw new SmsServiceIsDisabled();

        if(sendToFixNumber()){
            smsDto.setUserNumber(getFixNumber().getValue());
        }
        insertSendRequest(smsDto,"FARAZ_SMS_PATTERN_JOINTOPLACE",SmsTypes.JOINED_TO_PLACE);
        return true;
    }

    @Override
    public boolean sendJoinedToCorporateSms(SmsDto smsDto) throws Exception {
        log.info("Going to sendJoinedToCorporateSms with params: {} ...\n", smsDto);


        if (canSendSms())
            throw new SmsServiceIsDisabled();

        if(sendToFixNumber()){
            smsDto.setUserNumber(getFixNumber().getValue());
        }
        insertSendRequest(smsDto,"FARAZ_SMS_PATTERN_JOINTOCORPORATE",SmsTypes.JOINED_TO_CORPORATE);
        return true;
    }

    @Override
    public boolean sendRegisterCompleted(SmsDto smsDto) throws Exception {
        log.info("Going to sendRegisterCompleted with params: {} ...\n", smsDto);

        if (canSendSms())
            throw new SmsServiceIsDisabled();

        if(sendToFixNumber()){
            smsDto.setUserNumber(getFixNumber().getValue());
        }
        insertSendRequest(smsDto,"FARAZ_SMS_PATTERN_JOINREQUEST",SmsTypes.JOIN_PLACE_REQUEST);
        return true;
    }

    @Override
    public boolean sendLowBudgetToCorporate(SmsDto smsDto) throws Exception {
        log.info("Going to sendLowBudgetToCorporate with params: {} ...\n", smsDto);

        if (canSendSms())
            throw new SmsServiceIsDisabled();

        if(sendToFixNumber()){
            smsDto.setUserNumber(getFixNumber().getValue());
        }
        insertSendRequest(smsDto,"FARAZ_SMS_PATTERN_LOWBUDGET_CORPORATE",SmsTypes.CORPORATE_LOW_BUDGET);
        return true;
    }

    @Override
    public boolean sendUserTransactionComplete(SmsDto smsDto) throws Exception {

        log.info("Going to sendUserTransactionComplete with params: {} ...\n", smsDto);


        if (canSendSms())
            throw new SmsServiceIsDisabled();

        if(sendToFixNumber()){
            smsDto.setUserNumber(getFixNumber().getValue());
        }
        insertSendRequest(smsDto,"FARAZ_SMS_PATTERN_USER_CHARGE",SmsTypes.USER_CHARGE);
        return true;
    }

    @Override
    public boolean sendCorporateTransactionComplete(SmsDto smsDto) throws Exception {
        log.info("Going to sendCorporateTransactionComplete with params: {} ...\n", smsDto);


        if (canSendSms())
            throw new SmsServiceIsDisabled();

        if(sendToFixNumber()){
            smsDto.setUserNumber(getFixNumber().getValue());
        }
        insertSendRequest(smsDto,"FARAZ_SMS_PATTERN_CORPORATE_CHARGE",SmsTypes.CORPORATE_CHARGE);
        return true;
    }

    @Override
    public boolean sendYouBuySubscribe(SmsDto smsDto) throws Exception {
        log.info("Going to sendYouBuySubscribe with params: {} ...\n", smsDto);


        if (canSendSms())
            throw new SmsServiceIsDisabled();

        if(sendToFixNumber()){
            smsDto.setUserNumber(getFixNumber().getValue());
        }
        insertSendRequest(smsDto,"FARAZ_SMS_PATTERN_USER_BUY_SUBSCRIBE",SmsTypes.USER_BUY_SUBSCRIBE);
        return true;
    }

    @Override
    public boolean sendYouBuyMultipleSubscribe(SmsDto smsDto) throws Exception {
        log.info("Going to sendYouBuySubscribe with params: {} ...\n", smsDto);


        if (canSendSms())
            throw new SmsServiceIsDisabled();

        if(sendToFixNumber()){
            smsDto.setUserNumber(getFixNumber().getValue());
        }
        insertSendRequest(smsDto,"FARAZ_SMS_PATTERN_USER_BUY_MULTIPLE_SUBSCRIBE",SmsTypes.USER_BUY_SUBSCRIBE);
        return true;
    }

    @Override
    public boolean sendAdminRoleInCorporate(SmsDto smsDto) throws Exception {
        log.info("Going to sendYouBuySubscribe with params: {} ...\n", smsDto);


        if (canSendSms())
            throw new SmsServiceIsDisabled();

        if(sendToFixNumber()){
            smsDto.setUserNumber(getFixNumber().getValue());
        }
        insertSendRequest(smsDto,"FARAZ_SMS_PATTERN_ADMIN_TO_CORPORATE",SmsTypes.JOINED_TO_CORPORATE);
        return true;
    }

    @Override
    public boolean sendFirstTicketSell(SmsDto smsDto) throws Exception {
        log.info("Going to sendYouBuySubscribe with params: {} ...\n", smsDto);


        if (canSendSms())
            throw new SmsServiceIsDisabled();

        if(sendToFixNumber()){
            smsDto.setUserNumber(getFixNumber().getValue());
        }
        insertSendRequest(smsDto,"FARAZ_SMS_PATTERN_SELL_TICKET_1",SmsTypes.USER_BUY_SUBSCRIBE);
        return true;
    }

    @Override
    public boolean sendOrdinaryTicketSell(SmsDto smsDto) throws Exception {
        log.info("Going to sendYouBuySubscribe with params: {} ...\n", smsDto);


        if (canSendSms())
            throw new SmsServiceIsDisabled();

        if(sendToFixNumber()){
            smsDto.setUserNumber(getFixNumber().getValue());
        }
        insertSendRequest(smsDto,"FARAZ_SMS_PATTERN_SELL_TICKET_2",SmsTypes.USER_BUY_SUBSCRIBE);
        return true;
    }

    @Override
    public boolean sendCloseInvoiceWarning(SmsDto smsDto) throws Exception {
        log.info("Going to sendCloseInvoiceWarning with params: {} ...\n", smsDto);


        if (canSendSms())
            throw new SmsServiceIsDisabled();

        if(sendToFixNumber()){
            smsDto.setUserNumber(getFixNumber().getValue());
        }
        insertSendRequest(smsDto,"FARAZ_SEND_CLOSE_INVOICE_WARNING",SmsTypes.USER_BUY_SUBSCRIBE);
        return true;
    }

    @Override
    public boolean sendSupportAnswered(SmsDto smsDto) throws Exception {
        log.info("Going to sendSupportAnswered with params: {} ...\n", smsDto);


        if (canSendSms())
            throw new SmsServiceIsDisabled();

        if(sendToFixNumber()){
            smsDto.setUserNumber(getFixNumber().getValue());
        }
        insertSendRequest(smsDto,"FARAZ_SMS_PATTERN_SUPPORT_ANSWERED",SmsTypes.SUPPORT_ANSWERED);
        return true;
    }

    @Override
    public boolean sendPlaceContractCode(Long placeId,SmsDto smsDto) throws Exception {
        log.info("Going to sendPlaceContractCode with params: {} ...\n", smsDto);


        if (canSendSms())
            throw new SmsServiceIsDisabled();

        if(sendToFixNumber()){
            smsDto.setUserNumber(getFixNumber().getValue());
        }
        updatePlaceContractCode(smsDto.getText1(), placeId, smsDto.getUserNumber(),"not send");
        insertSendRequest(smsDto,"FARAZ_SMS_PATTERN_PLACE_CONTRACT",SmsTypes.JOIN_PLACE_REQUEST);
        return true;
    }

    @Override
    public boolean sendCorporateContractCode(Long corporateId,SmsDto smsDto) throws Exception {
        log.info("Going to sendPlaceContractCode with params: {} ...\n", smsDto);


        if (canSendSms())
            throw new SmsServiceIsDisabled();

        if(sendToFixNumber()){
            smsDto.setUserNumber(getFixNumber().getValue());
        }

        updateCorporateContractCode(smsDto.getText1(), corporateId, smsDto.getUserNumber(),"not send");
        insertSendRequest(smsDto,"FARAZ_SMS_PATTERN_CORPORATE_CONTRACT",SmsTypes.JOINED_TO_CORPORATE);
        return true;
    }


    private boolean sendToFixNumber() {
        SettingDto FixNumber = getFixNumber();
        return FixNumber != null && !FixNumber.getValue().isEmpty();
    }

    private SettingDto getFixNumber() {
        return settingsService.getByKey("SMS_FIX_NUMBER");
    }

    private boolean canSendSms() {
        return Boolean.parseBoolean(settingsService.getByKey("SMS_ACTIVE").getValue());
    }


    private void insertSendRequest(SmsDto smsDto, String patternName,SmsTypes smsType) {
        ManageSmsPatternEntity pattern = manageSmsPatternRepository.findByPatternKeyAndDeletedFalse(patternName);

        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        cal.add(Calendar.MINUTE, pattern.getDelayInMin());

        manageSmsRepository.add(ManageSmsEntity.builder()
                .sendTime(cal.getTime())
                .smsStatus(SmsStatus.PENDING)
                .pattern(pattern)
                .userNumber(smsDto.getUserNumber())
                .text1(smsDto.getText1())
                .text2(smsDto.getText2())
                .text3(smsDto.getText3())
                .text4(smsDto.getText4())
                .smsTypes(smsType)
                .build());
    }

    private String getEncoded(String text1) {
        try {
           return URLEncoder.encode(text1, StandardCharsets.UTF_8);
        }catch (Exception e){};
        return null;
    }


    private void updateUserLoginCode(String smsCode, Long userId, String body) {

        UserEntity user = userService.getEntityById(userId);
        Calendar expireDate = Calendar.getInstance();
        expireDate.add(Calendar.MINUTE, 2);
        UserActivationCodeEntity code = user.getActivationCode();
        if (code == null) {
            code = new UserActivationCodeEntity();
            code.setUser(user);
        }
        code.setCode(passwordEncoder.encode(smsCode));
        code.setSenderId(body);
        code.setExpiredDate(expireDate.getTime());
        code.setDeleted(false);
        userActivationCodeRepository.update(code);
        log.info("Verification sms sent to user: {} with following code {}...\n", user, smsCode);
    }
    private void updateCorporateContractCode(String smsCode, Long CorporateId,String phoneNumber, String body) {

        CorporateEntity corporate = corporateRepository.getById(CorporateId);
        Calendar expireDate = Calendar.getInstance();
        expireDate.add(Calendar.MINUTE, 3);

        CorporateContractCodeEntity code = corporate.getContractCode();
        if (code == null) {
            code = new CorporateContractCodeEntity();
            code.setCorporate(corporate);
        }
        code.setCode(passwordEncoder.encode(smsCode));
        code.setSenderId(body);
        code.setExpiredDate(expireDate.getTime());
        code.setDeleted(false);
        corporateContractCodeRepository.update(code);
        log.info("Verification corporate sms sent to corporate: {} phoneNumber: {} with following code {}...\n", corporate,phoneNumber, smsCode);
    }
    private void updatePlaceContractCode(String smsCode, Long placeId,String phoneNumber, String body) {

        PlaceGymEntity place = placeGymRepository.getById(placeId);
        Calendar expireDate = Calendar.getInstance();
        expireDate.add(Calendar.MINUTE, 3);

        PlaceContractCodeEntity code = place.getContractCode();
        if (code == null) {
            code = new PlaceContractCodeEntity();
            code.setPlace(place);
        }
        code.setCode(passwordEncoder.encode(smsCode));
        code.setSenderId(body);
        code.setExpiredDate(expireDate.getTime());
        code.setDeleted(false);
        placeContractCodeRepository.update(code);
        log.info("Verification sms sent to place: {} phoneNumber: {} with following code {}...\n", place,phoneNumber, smsCode);
    }

}
