package com.notrika.gympin.domain.contact.sms;

import com.notrika.gympin.common._base.base.Consts;
import com.notrika.gympin.common.contact.sms.dto.SmsDto;
import com.notrika.gympin.common.contact.sms.service.SmsService;
import com.notrika.gympin.common.gympin.base.dto.SettingDto;
import com.notrika.gympin.common.gympin.base.service.SettingsService;
import com.notrika.gympin.domain.user.UserServiceImpl;
import com.notrika.gympin.persistence.dao.repository.ActivationCodeRepository;
import com.notrika.gympin.persistence.entity.activationCode.ActivationCodeEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Calendar;

@Slf4j
@Service
public class SmsServiceImpl implements SmsService {


    @Autowired
    private ActivationCodeRepository activationCodeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private SettingsService settingsService;

    @Transactional
    @Override
    public boolean sendVerificationSms(Long userId, SmsDto smsDto) throws Exception {
        log.info("Going to send verification sms with params: {} || {}...\n", userId, smsDto);
        SettingDto FixNumber = settingsService.getByKey("SMS_FIX_NUMBER");
        if(FixNumber!=null && !FixNumber.getValue().isEmpty()){
            smsDto.setUserNumber(FixNumber.getValue());
        }
        String url = Consts.FARAZ_SMS_FIXPART + "&pid=" + Consts.FARAZ_SMS_PATTERN_SENDCODE + "&fnum=" + Consts.FARAZ_SMS_SENDER_NUMBER + "&tnum=" + smsDto.getUserNumber() + "&p1"+ "=code" + "&v1=" + URLEncoder.encode(smsDto.getText(), StandardCharsets.UTF_8);

        URL url2 = new URL(url);
        URLConnection con = url2.openConnection();
        InputStream in = con.getInputStream();
        String encoding = con.getContentEncoding();
        encoding = encoding == null ? "UTF-8" : encoding;
        String body = IOUtils.toString(in, encoding);
        UserEntity user = userService.getEntityById(userId);
        Calendar expireDate = Calendar.getInstance();
        expireDate.add(Calendar.MINUTE, 2);
        ActivationCodeEntity code = user.getActivationCode();
        if (code == null) {
            code = new ActivationCodeEntity();
            code.setUser(user);
        }
        code.setCode(passwordEncoder.encode(smsDto.getText()));
        code.setSenderId(body);
        code.setExpiredDate(expireDate.getTime());
        code.setDeleted(false);
        activationCodeRepository.update(code);
        log.info("Verification sms sent to user: {} with following code {}...\n", user, smsDto.getText());
        return Integer.parseInt(body) > 0;
    }

    @Transactional
    @Override
    public boolean sendJoinedToPlaceSms(SmsDto smsDto) throws Exception {
        log.info("Going to send joined to place sms with params: {} ...\n", smsDto);
        SettingDto FixNumber = settingsService.getByKey("SMS_FIX_NUMBER");
        if(FixNumber!=null&&!FixNumber.getValue().isEmpty()){
            smsDto.setUserNumber(FixNumber.getValue());
        }
        String url = Consts.FARAZ_SMS_FIXPART +"&pid=" + Consts.FARAZ_SMS_PATTERN_JOINTOPLACE + "&fnum=" + Consts.FARAZ_SMS_SENDER_NUMBER + "&tnum=" + smsDto.getUserNumber() + "&p1"+"=place" + "&v1=" + URLEncoder.encode( smsDto.getText(), StandardCharsets.UTF_8);
        URL url2 = new URL(url);
        URLConnection con = url2.openConnection();
        InputStream in = con.getInputStream();
        String encoding = con.getContentEncoding();
        encoding = encoding == null ? "UTF-8" : encoding;
        String body = IOUtils.toString(in, encoding);
        return Integer.parseInt(body) > 0;
    }

    @Override
    public boolean sendJoinedToCorporateSms(SmsDto smsDto) throws Exception {
        log.info("Going to send joined to corporate sms with params: {} ...\n", smsDto);
        SettingDto FixNumber = settingsService.getByKey("SMS_FIX_NUMBER");
        if(FixNumber!=null&&!FixNumber.getValue().isEmpty()){
            smsDto.setUserNumber(FixNumber.getValue());
        }
        String url = Consts.FARAZ_SMS_FIXPART +"&pid=" + Consts.FARAZ_SMS_PATTERN_JOINTOCORPORATE + "&fnum=" + Consts.FARAZ_SMS_SENDER_NUMBER + "&tnum=" + smsDto.getUserNumber() + "&p1"+"=corporate" + "&v1=" + URLEncoder.encode( smsDto.getText(), StandardCharsets.UTF_8);
        URL url2 = new URL(url);
        URLConnection con = url2.openConnection();
        InputStream in = con.getInputStream();
        String encoding = con.getContentEncoding();
        encoding = encoding == null ? "UTF-8" : encoding;
        String body = IOUtils.toString(in, encoding);
        return Integer.parseInt(body) > 0;
    }

    @Override
    public boolean sendRegisterCompleted(SmsDto smsDto) throws Exception {
        log.info("Going to send join to place sms with params: {} ...\n", smsDto);
        SettingDto FixNumber = settingsService.getByKey("SMS_FIX_NUMBER");
        if(FixNumber!=null&&!FixNumber.getValue().isEmpty()){
            smsDto.setUserNumber(FixNumber.getValue());
        }
        String url = Consts.FARAZ_SMS_FIXPART +"&pid=" + Consts.FARAZ_SMS_PATTERN_JOINREQUEST + "&fnum=" + Consts.FARAZ_SMS_SENDER_NUMBER + "&tnum=" + smsDto.getUserNumber() + "&p1"+"=place" + "&v1=" + URLEncoder.encode( smsDto.getText(), StandardCharsets.UTF_8);
        URL url2 = new URL(url);
        URLConnection con = url2.openConnection();
        InputStream in = con.getInputStream();
        String encoding = con.getContentEncoding();
        encoding = encoding == null ? "UTF-8" : encoding;
        String body = IOUtils.toString(in, encoding);
        return Integer.parseInt(body) > 0;
    }

    @Override
    public boolean sendLowBudgetToCorporate(SmsDto smsDto) throws Exception {
        log.info("Going to send join to place sms with params: {} ...\n", smsDto);
        SettingDto FixNumber = settingsService.getByKey("SMS_FIX_NUMBER");
        if(FixNumber!=null&&!FixNumber.getValue().isEmpty()){
            smsDto.setUserNumber(FixNumber.getValue());
        }
        String url = Consts.FARAZ_SMS_FIXPART +"&pid=" + Consts.FARAZ_SMS_PATTERN_LOWBUDGET_CORPORATE + "&fnum=" + Consts.FARAZ_SMS_SENDER_NUMBER + "&tnum=" + smsDto.getUserNumber() + "&p1"+"=place" + "&v1=" + URLEncoder.encode( smsDto.getText(), StandardCharsets.UTF_8);
        URL url2 = new URL(url);
        URLConnection con = url2.openConnection();
        InputStream in = con.getInputStream();
        String encoding = con.getContentEncoding();
        encoding = encoding == null ? "UTF-8" : encoding;
        String body = IOUtils.toString(in, encoding);
        return Integer.parseInt(body) > 0;
    }

}
