package com.notrika.gympin.common.settings.sms.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.settings.sms.enums.SmsStatus;
import com.notrika.gympin.common.util._base.dto.BaseDto;
import com.notrika.gympin.common.settings.sms.enums.SmsTypes;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreateUpdate;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.time.LocalTime;
import java.util.Date;

@Data
@ToString
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class SmsDto extends BaseDtoWithCreateUpdate<SmsDto> {

    @JsonProperty("UserNumber")
    private String userNumber;

    @JsonProperty("SentBodyCode")
    private String sentBodyCode;

    @JsonProperty("SmsType")
    private SmsTypes smsType;

    @JsonProperty("SmsStatus")
    private SmsStatus smsStatus;

    @JsonProperty("SmsSendTime")
    private Date smsSendTime;

    @JsonProperty("Text1")
    private String text1;

    @JsonProperty("Text2")
    private String text2;

    @JsonProperty("Text3")
    private String text3;

    @JsonProperty("Text4")
    private String text4;

    @JsonProperty("Pattern")
    private PatternDto pattern;

    public SmsDto(String userNumber, SmsTypes smsType, String text1) {
        this.userNumber = userNumber;
        this.smsType = smsType;
        this.text1 = text1;
    }
    public SmsDto(String userNumber, SmsTypes smsType, String text1, String text2) {
        this.userNumber = userNumber;
        this.smsType = smsType;
        this.text1 = text1;
        this.text2 = text2;
    }
    public SmsDto(String userNumber, SmsTypes smsType, String text1, String text2, String text3) {
        this.userNumber = userNumber;
        this.smsType = smsType;
        this.text1 = text1;
        this.text2 = text2;
        this.text3 = text3;
    }

    public SmsDto(String userNumber, SmsTypes smsType, String text1, String text2, String text3, String text4) {
        this.userNumber = userNumber;
        this.smsType = smsType;
        this.text1 = text1;
        this.text2 = text2;
        this.text3 = text3;
        this.text4 = text4;
    }

}
