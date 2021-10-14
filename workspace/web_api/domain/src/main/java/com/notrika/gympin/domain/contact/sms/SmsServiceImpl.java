package com.notrika.gympin.domain.contact.sms;

import com.notrika.gympin.common.Consts;
import com.notrika.gympin.common.contact.sms.dto.SmsDto;
import com.notrika.gympin.common.contact.sms.service.SmsService;
import com.notrika.gympin.dao.activationCode.ActivationCode;
import com.notrika.gympin.domain.user.UserServiceImpl;
import com.notrika.gympin.persistence.repository.ActivationCodeRepository;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;

@Service
public class SmsServiceImpl implements SmsService {

    @Autowired
    private ActivationCodeRepository activationCodeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserServiceImpl userService;

    @Override
    public boolean sendVerificationSms(Long userId, SmsDto smsDto) throws Exception {
        String url = Consts.FARAZ_SMS_FIXPART + "&pid=" + Consts.FARAZ_SMS_PATTER_SENDCODE + "&fnum=" + Consts.FARAZ_SMS_SENDER_NUMBER + "&tnum=" + smsDto.getUserNumber() + "&p1" +
                "=code" + "&v1=" + smsDto.getText();
        URL url2 = new URL(url);
        URLConnection con = url2.openConnection();
        InputStream in = con.getInputStream();
        String encoding = con.getContentEncoding();
        encoding = encoding == null ? "UTF-8" : encoding;
        Integer body = Integer.parseInt(IOUtils.toString(in, encoding));
        ActivationCode activationCode = new ActivationCode(userService.getUserById(userId), smsDto.getUserNumber(), passwordEncoder.encode(smsDto.getText()), body.toString());
        activationCodeRepository.save(activationCode);
        return body > 0;
    }

    @Override
    public String getLastCode(Long userId) {
        var activationCode = activationCodeRepository.findByUserId(userId).orElse(null);
        if (activationCode == null) return null;

        return activationCode.get(activationCode.toArray().length - 1).getCode();
    }
}
