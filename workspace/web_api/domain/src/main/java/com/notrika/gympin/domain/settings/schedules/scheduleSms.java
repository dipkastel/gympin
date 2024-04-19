package com.notrika.gympin.domain.settings.schedules;

import com.notrika.gympin.common.settings.sms.enums.SmsStatus;
import com.notrika.gympin.common.util.exception.general.SendSmsException;
import com.notrika.gympin.domain.settings.schedules.farazSmsDataModels.smsRequest;
import com.notrika.gympin.domain.settings.schedules.farazSmsDataModels.smsResult;
import com.notrika.gympin.persistence.dao.repository.settings.ManageSettingsRepository;
import com.notrika.gympin.persistence.dao.repository.settings.ManageSmsRepository;
import com.notrika.gympin.persistence.entity.management.sms.ManageSmsEntity;
import org.apache.commons.io.IOUtils;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class scheduleSms {


    @Autowired
    private ManageSmsRepository manageSmsRepository;

    @Autowired
    private ManageSettingsRepository manageSettingsRepository;

    @Autowired
    public scheduleSms() {
        System.out.println("Create sms time is : -> " + new Date().toString());
    }


    public void sendSms() {
        //GET SMS
        List<ManageSmsEntity> pendingMessages = manageSmsRepository.findAllByDeletedIsFalseAndSmsStatusAndSendTimeLessThan(SmsStatus.PENDING,new Date());
        for (ManageSmsEntity pending : pendingMessages) {
            switch (pending.getPattern().getProvider().getValue()) {
                case "FARAZ":{
                    System.out.println("sms time is : -> " + new Date().toString());
                   var result = sendMessageOnFaraz(pending);
                   if(result>0)
                       smsSent(pending,result);
                   else
                       faildToSend(pending,"error in sending message");
                   break;
                }
                default:faildToSend(pending,"provider is not define");
            }
        }
    }

    private void smsSent(ManageSmsEntity pending, Integer result) {
        pending.setSmsStatus(SmsStatus.SENT);
        pending.setSentBodyCode(result.toString());
        manageSmsRepository.update(pending);
    }

    private void faildToSend(ManageSmsEntity pending,String reason) {
        pending.setSmsStatus(SmsStatus.FAILED);
        pending.setSentBodyCode(reason);
        manageSmsRepository.update(pending);
    }

    private Integer sendMessageOnFaraz(ManageSmsEntity entity) {
        try {
            //call api
            var smsPattern = entity.getPattern();
            final String uri = "https://api2.ippanel.com/api/v1/sms/pattern/normal/send";
            RestTemplate restTemplate = new RestTemplate();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("apikey",manageSettingsRepository.findByKeyAndDeletedFalse("FARAZ_SMS_URL").getValue());

            smsRequest body =new smsRequest();
            body.code = smsPattern.getPatternCode();
            body.sender = manageSettingsRepository.findByKeyAndDeletedFalse("FARAZ_SMS_SENDER_NUMBER").getValue();
            body.recipient = entity.getUserNumber();
            HashMap<String, String> vars = new HashMap<>();
            Pattern pattern = Pattern.compile("%(.*?)%");
            Matcher matcher = pattern.matcher(smsPattern.getTemplate());
            int count = 1;
            while (matcher.find()) {
                vars.put(matcher.group(1),gettexti(count,entity));
                count++;
            }
            body.variable = vars;
            ObjectMapper objectMapper = new ObjectMapper();
            String paramJson = objectMapper.writeValueAsString(body);
            HttpEntity<String> param = new HttpEntity<String>(paramJson,headers);
            ResponseEntity<smsResult> result = restTemplate.exchange(uri, HttpMethod.POST,param, smsResult.class);

            if(result.getBody().code==200){
                if(result.getBody().data.message_id!=null)
                    return result.getBody().data.message_id;
                //todo only log error
                else return 1;
            }else{
                return -1;
            }
        }catch (Exception e){
            faildToSend(entity,"خطا در ارسال از فراز");
            throw new SendSmsException();
        }
    }

    private URL generateUrl(ManageSmsEntity entity) throws MalformedURLException {
        var smsPattern = entity.getPattern();
        String url = manageSettingsRepository.findByKeyAndDeletedFalse("FARAZ_SMS_URL").getValue()+
                "&pid="+smsPattern.getPatternCode()+
                "&fnum=" + manageSettingsRepository.findByKeyAndDeletedFalse("FARAZ_SMS_SENDER_NUMBER").getValue()+
                "&tnum=" + entity.getUserNumber();
        Pattern pattern = Pattern.compile("%(.*?)%");
        Matcher matcher = pattern.matcher(smsPattern.getTemplate());
        int count = 1;
        while (matcher.find()) {
            var apendtext = "&p"+count+"="+matcher.group(1)+"&v"+count+"="+ URLEncoder.encode(gettexti(count,entity), StandardCharsets.UTF_8);
            url+=apendtext;
            count++;
        }
        return  new URL(url);
    }

    private String gettexti(int i ,ManageSmsEntity entity) {
        switch (i){
            case 1: return entity.getText1();
            case 2: return entity.getText2();
            case 3: return entity.getText3();
            case 4: return entity.getText4();
            default: return null;
        }
    }
}
