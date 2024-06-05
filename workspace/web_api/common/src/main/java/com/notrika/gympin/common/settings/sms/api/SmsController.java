package com.notrika.gympin.common.settings.sms.api;

import com.notrika.gympin.common.settings.sms.dto.PatternDto;
import com.notrika.gympin.common.settings.sms.dto.SmsDto;
import com.notrika.gympin.common.settings.sms.param.SmsParam;
import com.notrika.gympin.common.settings.sms.param.SmsPatternParam;
import com.notrika.gympin.common.settings.sms.query.SmsQuery;
import com.notrika.gympin.common.util._base.base.BaseController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;


public interface SmsController extends BaseController<SmsParam, SmsDto, SmsQuery> {

    ResponseEntity<Boolean> changeSmsStatus(@RequestBody SmsParam smsParam) throws Exception;

    ResponseEntity<List<PatternDto>> getAllPaterns() throws Exception;

    ResponseEntity<PatternDto> addPattern(@RequestBody SmsPatternParam smsPatternParam) throws Exception;

    ResponseEntity<PatternDto> updatePattern(@RequestBody SmsPatternParam smsPatternParam) throws Exception;

}
