package com.notrika.gympin.common.settings.sms.service;

import com.notrika.gympin.common.settings.sms.dto.PatternDto;
import com.notrika.gympin.common.settings.sms.dto.SmsDto;
import com.notrika.gympin.common.settings.sms.param.SmsParam;
import com.notrika.gympin.common.settings.sms.param.SmsPatternParam;
import com.notrika.gympin.common.settings.sms.query.SmsQuery;
import com.notrika.gympin.common.util._base.base.BaseService;

import java.util.List;

public interface SmsService extends BaseService<SmsParam, SmsDto, SmsQuery> {
    boolean changeSmsStatus(SmsParam smsParam) throws Exception;
    List<PatternDto> getAllPatterns() throws Exception;
    PatternDto updatePattern(SmsPatternParam smsPatternParam) throws Exception;
    PatternDto addPattern(SmsPatternParam smsPatternParam) throws Exception;
}
