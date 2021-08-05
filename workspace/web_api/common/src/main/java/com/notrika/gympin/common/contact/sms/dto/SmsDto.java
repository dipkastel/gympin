package com.notrika.gympin.common.contact.sms.dto;

import com.notrika.gympin.common.BaseDto;
import com.notrika.gympin.common.contact.sms.enums.SmsTypes;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class SmsDto extends BaseDto<SmsDto> {
    private String userNumber;
    private SmsTypes smsType;
    private String text;
}
