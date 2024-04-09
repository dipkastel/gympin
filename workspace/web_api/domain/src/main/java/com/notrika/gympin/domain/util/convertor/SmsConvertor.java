package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.settings.reportSettings.dto.ReportSettingsDto;
import com.notrika.gympin.common.settings.sms.dto.PatternDto;
import com.notrika.gympin.common.settings.sms.dto.SmsDto;
import com.notrika.gympin.persistence.entity.management.settings.ManageReportSettingsEntity;
import com.notrika.gympin.persistence.entity.management.sms.ManageSmsEntity;
import com.notrika.gympin.persistence.entity.management.sms.ManageSmsPatternEntity;

public class SmsConvertor {

    public static SmsDto toDto(ManageSmsEntity entity) {
        if(entity==null) return null;
        return SmsDto.builder()
                .id(entity.getId())
                .userNumber(entity.getUserNumber())
                .smsType(entity.getSmsTypes())
                .smsStatus(entity.getSmsStatus())
                .smsSendTime(entity.getSendTime())
                .sentBodyCode(entity.getSentBodyCode())
                .pattern(SmsConvertor.toDto(entity.getPattern()))
                .text1(entity.getText1())
                .text2(entity.getText2())
                .text3(entity.getText3())
                .text4(entity.getText4())
                .build();
    }

    public static PatternDto toDto(ManageSmsPatternEntity entity) {
        if(entity==null) return null;
        return PatternDto.builder()
                .id(entity.getId())
                .delayInMin(entity.getDelayInMin())
                .patternKey(entity.getPatternKey())
                .template(entity.getTemplate())
                .name(entity.getName())
                .patternCode(entity.getPatternCode())
                .provider(entity.getProvider().getValue())
                .build();
    }

}
