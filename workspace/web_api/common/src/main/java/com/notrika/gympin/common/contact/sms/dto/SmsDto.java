package com.notrika.gympin.common.contact.sms.dto;

import com.notrika.gympin.common.BaseDto;
import com.notrika.gympin.common.contact.sms.enums.SmsTypes;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class SmsDto extends BaseDto<SmsDto> {
    private String userNumber;
    private SmsTypes smsType;
    private String text;

    public SmsDto(String userNumber, SmsTypes smsType, String text) {
        this.userNumber = userNumber;
        this.smsType = smsType;
        this.text = text;
    }
}
