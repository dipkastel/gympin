package com.notrika.gympin.domain.contact.sms;

import com.notrika.gympin.common.Consts;
import com.notrika.gympin.common.contact.sms.dto.SmsDto;
import com.notrika.gympin.common.contact.sms.service.SmsService;
import com.notrika.gympin.domain.user.UserServiceImpl;
import com.notrika.gympin.persistence.dao.repository.ActivationCodeRepository;
import com.notrika.gympin.persistence.entity.activationCode.ActivationCodeEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
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
        log.info("Going to send verification sms with params: {} || {}...\n", userId, smsDto);
        String url = Consts.FARAZ_SMS_FIXPART + "&pid=" + Consts.FARAZ_SMS_PATTER_SENDCODE + "&fnum=" + Consts.FARAZ_SMS_SENDER_NUMBER + "&tnum=" + smsDto.getUserNumber() + "&p1"
                + "=code" + "&v1=" + smsDto.getText();
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

}
