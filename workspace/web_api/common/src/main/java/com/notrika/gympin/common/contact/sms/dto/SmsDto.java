package com.notrika.gympin.common.contact.sms.dto;

import com.notrika.gympin.common.contact.sms.enums.SmsTypes;
import lombok.Data;

@Data
public class SmsDto {
    private String userNumber;
    private SmsTypes smsType;
    private String text;
}
