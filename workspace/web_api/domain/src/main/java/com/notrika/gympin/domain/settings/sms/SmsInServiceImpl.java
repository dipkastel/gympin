package com.notrika.gympin.domain.settings.sms;

import com.notrika.gympin.common.settings.base.dto.SettingDto;
import com.notrika.gympin.common.settings.base.service.SettingsService;
import com.notrika.gympin.common.settings.sms.dto.SmsDto;
import com.notrika.gympin.common.settings.sms.enums.SmsStatus;
import com.notrika.gympin.common.settings.sms.enums.SmsTypes;
import com.notrika.gympin.common.settings.sms.service.SmsInService;
import com.notrika.gympin.common.util.exception.general.SmsServiceIsDisabled;
import com.notrika.gympin.domain.user.UserServiceImpl;
import com.notrika.gympin.persistence.dao.repository.settings.ManageSmsPatternRepository;
import com.notrika.gympin.persistence.dao.repository.settings.ManageSmsRepository;
import com.notrika.gympin.persistence.dao.repository.user.UserActivationCodeRepository;
import com.notrika.gympin.persistence.entity.management.sms.ManageSmsEntity;
import com.notrika.gympin.persistence.entity.management.sms.ManageSmsPatternEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import com.notrika.gympin.persistence.entity.user.activationCode.UserActivationCodeEntity;
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
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private SettingsService settingsService;

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
            updateUserLoginCode(smsDto.getText1(), userId, "not send");
            smsDto.setUserNumber(getFixNumber().getValue());
        }
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
//
//        String url = Consts.FARAZ_SMS_FIXPART +
//                "&pid=" + Consts.FARAZ_SMS_PATTERN_JOINTOPLACE +
//                "&fnum=" + Consts.FARAZ_SMS_SENDER_NUMBER +
//                "&tnum=" + smsDto.getUserNumber() +
//                "&p1" + "=place" + "&v1=" + URLEncoder.encode(smsDto.getText1(), StandardCharsets.UTF_8) +
//                "&p2" + "=role" + "&v2=" + URLEncoder.encode(smsDto.getText2(), StandardCharsets.UTF_8);
//        URL url2 = new URL(url);
//        URLConnection con = url2.openConnection();
//        InputStream in = con.getInputStream();
//        String encoding = con.getContentEncoding();
//        encoding = encoding == null ? "UTF-8" : encoding;
//        String body = IOUtils.toString(in, encoding);
//        return Integer.parseInt(body) > 0;
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

//        String url = Consts.FARAZ_SMS_FIXPART + "&pid=" + Consts.FARAZ_SMS_PATTERN_JOINTOCORPORATE + "&fnum=" + Consts.FARAZ_SMS_SENDER_NUMBER + "&tnum=" + smsDto.getUserNumber() + "&p1" + "=corporate" + "&v1=" + URLEncoder.encode(smsDto.getText1(), StandardCharsets.UTF_8);
//        URL url2 = new URL(url);
//        URLConnection con = url2.openConnection();
//        InputStream in = con.getInputStream();
//        String encoding = con.getContentEncoding();
//        encoding = encoding == null ? "UTF-8" : encoding;
//        String body = IOUtils.toString(in, encoding);
//        return Integer.parseInt(body) > 0;
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

//        String url = Consts.FARAZ_SMS_FIXPART + "&pid=" + Consts.FARAZ_SMS_PATTERN_JOINREQUEST + "&fnum=" + Consts.FARAZ_SMS_SENDER_NUMBER + "&tnum=" + smsDto.getUserNumber() + "&p1" + "=place" + "&v1=" + URLEncoder.encode(smsDto.getText1(), StandardCharsets.UTF_8);
//        URL url2 = new URL(url);
//        URLConnection con = url2.openConnection();
//        InputStream in = con.getInputStream();
//        String encoding = con.getContentEncoding();
//        encoding = encoding == null ? "UTF-8" : encoding;
//        String body = IOUtils.toString(in, encoding);
//        return Integer.parseInt(body) > 0;
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
//
//
//        String url = Consts.FARAZ_SMS_FIXPART + "&pid=" + Consts.FARAZ_SMS_PATTERN_LOWBUDGET_CORPORATE + "&fnum=" + Consts.FARAZ_SMS_SENDER_NUMBER + "&tnum=" + smsDto.getUserNumber() + "&p1" + "=place" + "&v1=" + URLEncoder.encode(smsDto.getText1(), StandardCharsets.UTF_8);
//        URL url2 = new URL(url);
//        URLConnection con = url2.openConnection();
//        InputStream in = con.getInputStream();
//        String encoding = con.getContentEncoding();
//        encoding = encoding == null ? "UTF-8" : encoding;
//        String body = IOUtils.toString(in, encoding);
//        return Integer.parseInt(body) > 0;
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

//        String url = Consts.FARAZ_SMS_FIXPART +
//                "&pid=" + Consts.FARAZ_SMS_PATTERN_USER_CHARGE +
//                "&fnum=" + Consts.FARAZ_SMS_SENDER_NUMBER +
//                "&tnum=" + smsDto.getUserNumber() +
//                "&p1" + "=amount" +
//                "&v1=" + URLEncoder.encode(smsDto.getText1(), StandardCharsets.UTF_8);
//        URL url2 = new URL(url);
//        URLConnection con = url2.openConnection();
//        InputStream in = con.getInputStream();
//        String encoding = con.getContentEncoding();
//        encoding = encoding == null ? "UTF-8" : encoding;
//        String body = IOUtils.toString(in, encoding);
//        return Integer.parseInt(body) > 0;
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

//
//        String url = Consts.FARAZ_SMS_FIXPART +
//                "&pid=" + Consts.FARAZ_SMS_PATTERN_CORPORATE_CHARGE +
//                "&fnum=" + Consts.FARAZ_SMS_SENDER_NUMBER +
//                "&tnum=" + smsDto.getUserNumber() +
//                "&p1" + "=amount" +
//                "&v1=" + URLEncoder.encode(smsDto.getText1(), StandardCharsets.UTF_8);
//        URL url2 = new URL(url);
//        URLConnection con = url2.openConnection();
//        InputStream in = con.getInputStream();
//        String encoding = con.getContentEncoding();
//        encoding = encoding == null ? "UTF-8" : encoding;
//        String body = IOUtils.toString(in, encoding);
//        return Integer.parseInt(body) > 0;
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
//
//        String url = Consts.FARAZ_SMS_FIXPART +
//                "&pid=" + Consts.FARAZ_SMS_PATTERN_USER_BUY_SUBSCRIBE +
//                "&fnum=" + Consts.FARAZ_SMS_SENDER_NUMBER +
//                "&tnum=" + smsDto.getUserNumber() +
//                "&p1" + "=subscribe-name" +
//                "&v1=" + URLEncoder.encode(smsDto.getText1(), StandardCharsets.UTF_8) +
//                "&p2" + "=place-name" +
//                "&v2=" + URLEncoder.encode(smsDto.getText2(), StandardCharsets.UTF_8);
//        URL url2 = new URL(url);
//        URLConnection con = url2.openConnection();
//        InputStream in = con.getInputStream();
//        String encoding = con.getContentEncoding();
//        encoding = encoding == null ? "UTF-8" : encoding;
//        String body = IOUtils.toString(in, encoding);
//        return Integer.parseInt(body) > 0;
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
//
//        String url = Consts.FARAZ_SMS_FIXPART +
//                "&pid=" + Consts.FARAZ_SMS_PATTERN_SUPPORT_ANSWERED +
//                "&fnum=" + Consts.FARAZ_SMS_SENDER_NUMBER +
//                "&tnum=" + smsDto.getUserNumber() +
//                "&p1" + "=support-id" +
//                "&v1=" + URLEncoder.encode(smsDto.getText1(), StandardCharsets.UTF_8);
//        URL url2 = new URL(url);
//        URLConnection con = url2.openConnection();
//        InputStream in = con.getInputStream();
//        String encoding = con.getContentEncoding();
//        encoding = encoding == null ? "UTF-8" : encoding;
//        String body = IOUtils.toString(in, encoding);
//        return Integer.parseInt(body) > 0;
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

}
