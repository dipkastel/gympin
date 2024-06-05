package com.notrika.gympin.common.settings.sms.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.settings.base.param.SettingParam;
import com.notrika.gympin.common.settings.reportSettings.param.ReportSettingsParam;
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
public class SmsPatternParam extends BaseParam<SmsPatternParam> {

    @JsonProperty("Name")
    private String name;

    @JsonProperty("PatternKey")
    private String patternKey;

    @JsonProperty("PatternCode")
    private String patternCode;

    @JsonProperty("SmsType")
    private SmsTypes smsType;

    @JsonProperty("Template")
    private String template;

    @JsonProperty("DelayInMin")
    private Integer delayInMin;


}
