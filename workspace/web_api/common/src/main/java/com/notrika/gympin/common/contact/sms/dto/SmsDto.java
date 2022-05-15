package com.notrika.gympin.common.contact.sms.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseDto;
import com.notrika.gympin.common.contact.sms.enums.SmsTypes;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Data
@ToString
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class SmsDto extends BaseDto<SmsDto> {

    @JsonProperty("UserNumber")
    private String userNumber;

    @JsonProperty("SmsType")
    private SmsTypes smsType;

    @JsonProperty("Text")
    private String text;

    public SmsDto(String userNumber, SmsTypes smsType, String text) {
        this.userNumber = userNumber;
        this.smsType = smsType;
        this.text = text;
    }

}
