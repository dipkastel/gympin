package com.notrika.gympin.domain.contact.sms;

import com.notrika.gympin.common.Consts;
import com.notrika.gympin.common.contact.sms.dto.SmsDto;
import com.notrika.gympin.common.contact.sms.service.SmsService;
import com.notrika.gympin.domain.user.UserServiceImpl;
import com.notrika.gympin.persistence.dao.repository.ActivationCodeRepository;
import com.notrika.gympin.persistence.entity.activationCode.ActivationCode;
import com.notrika.gympin.persistence.entity.user.User;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import java.util.Calendar;
import java.util.Date;

@Slf4j
@Service
public class SmsServiceImpl implements SmsService {

    @Autowired
    private ActivationCodeRepository activationCodeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserServiceImpl userService;

    @Transactional
    @Override
    public boolean sendVerificationSms(Long userId, SmsDto smsDto) throws Exception {
        log.info("Going to send verification sms...\n");
        String url = Consts.FARAZ_SMS_FIXPART + "&pid=" + Consts.FARAZ_SMS_PATTER_SENDCODE + "&fnum=" + Consts.FARAZ_SMS_SENDER_NUMBER + "&tnum=" + smsDto.getUserNumber() + "&p1" +
                "=code" + "&v1=" + smsDto.getText();
        URL url2 = new URL(url);
        URLConnection con = url2.openConnection();
        InputStream in = con.getInputStream();
        String encoding = con.getContentEncoding();
        encoding = encoding == null ? "UTF-8" : encoding;
        int body = Integer.parseInt(IOUtils.toString(in, encoding));
        User userById = userService.getUserById(userId);
        ActivationCode code = userById.getActivationCode();
        code.setCode(passwordEncoder.encode(smsDto.getText()));
        code.setSenderId(Integer.toString(body));
        activationCodeRepository.deleteAllByUser(userService.getUserById(userId));
        Calendar expireDate=Calendar.getInstance();
        expireDate.add(Calendar.MINUTE,2);
        ActivationCode activationCode = new ActivationCode(userService.getUserById(userId), smsDto.getUserNumber(), passwordEncoder.encode(smsDto.getText()), Integer.toString(body),expireDate.getTime());
        activationCodeRepository.add(activationCode);
        log.info("Verification sms sent to user: {} with following code {}...\n",userById,smsDto.getText());
        return body > 0;
    }

}
