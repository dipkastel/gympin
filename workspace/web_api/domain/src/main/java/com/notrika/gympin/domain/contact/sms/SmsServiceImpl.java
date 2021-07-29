package com.notrika.gympin.domain.contact.sms;

import com.notrika.gympin.common.Consts;
import com.notrika.gympin.common.contact.sms.dto.SmsDto;
import com.notrika.gympin.common.contact.sms.service.SmsService;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class SmsServiceImpl implements SmsService {

    @Override
    public boolean sendSms(SmsDto smsDto) {
        String url = Consts.FARAZ_SMS_FIXPART+"&pid="+ Consts.FARAZ_SMS_PATTER_SENDCODE+"&fnum="+ Consts
         .FARAZ_SMS_SENDER_NUMBER+"&tnum"+smsDto.getUserNumber()+"&p1=code"+"&v1="+smsDto.getText();
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .build();

        client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
                .thenApply(HttpResponse::body)
                .thenAccept(System.out::println)
                .join();
        return true;
    }
}
