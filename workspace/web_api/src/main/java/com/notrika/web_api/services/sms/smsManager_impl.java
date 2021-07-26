package com.notrika.web_api.services.sms;

import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class smsManager_impl implements SmsManager {


    @Override
    public boolean sendSms(String userNumber, SmsTypes smsType, String... params) {
        String url = consts.FARAZ_SMS_FIXPART+"&pid="+consts.FARAZ_SMS_PATTER_SENDCODE+"&fnum="+consts.FARAZ_SMS_SENDER_NUMBER+"&tnum"+userNumber+"&p1=code"+"&v1="+params[0];
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
