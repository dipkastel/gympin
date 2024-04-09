package com.notrika.gympin.common.settings.sms.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.settings.sms.enums.SmsStatus;
import com.notrika.gympin.common.settings.sms.enums.SmsTypes;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreateUpdate;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@Data
@ToString
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class PatternDto extends BaseDtoWithCreateUpdate<PatternDto> {

    @JsonProperty("Name")
    private String name;

    @JsonProperty("PatternKey")
    private String patternKey;

    @JsonProperty("PatternCode")
    private String patternCode;

    @JsonProperty("Template")
    private String template;

    @JsonProperty("DelayInMin")
    private Integer delayInMin;

    @JsonProperty("Provider")
    private String provider;

}
