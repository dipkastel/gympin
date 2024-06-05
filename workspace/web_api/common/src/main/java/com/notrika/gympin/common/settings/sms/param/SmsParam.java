package com.notrika.gympin.common.settings.sms.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.settings.sms.enums.SmsStatus;
import com.notrika.gympin.common.settings.sms.enums.SmsTypes;
import com.notrika.gympin.common.util._base.param.BaseParam;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class SmsParam extends BaseParam<SmsParam> {

    @JsonProperty("SmsStatus")
    private SmsStatus smsStatus;
    @JsonProperty("PhoneNumber")
    private String phoneNumber;
    @JsonProperty("Text1")
    private String Text1;
    @JsonProperty("Text2")
    private String Text2;
    @JsonProperty("Text3")
    private String Text3;
    @JsonProperty("Text4")
    private String Text4;
    @JsonProperty("Pattern")
    private SmsPatternParam pattern;

}
