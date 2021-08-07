package com.notrika.gympin.common.contact.sms.dto;

import com.notrika.gympin.common.BaseDto;
import com.notrika.gympin.common.contact.sms.enums.SmsTypes;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class SmsDto extends BaseDto<SmsDto> {
    public SmsDto(String userNumber, SmsTypes smsType, String text) {
        this.userNumber = userNumber;
        this.smsType = smsType;
        this.text = text;
    }

    private String userNumber;
    private SmsTypes smsType;
    private String text;
}
