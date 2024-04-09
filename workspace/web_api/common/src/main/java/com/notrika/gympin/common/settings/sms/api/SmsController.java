package com.notrika.gympin.common.settings.sms.api;

import com.notrika.gympin.common.settings.note.dto.SimpleNoteDto;
import com.notrika.gympin.common.settings.note.param.NoteParam;
import com.notrika.gympin.common.settings.sms.dto.SmsDto;
import com.notrika.gympin.common.settings.sms.param.SmsParam;
import com.notrika.gympin.common.settings.sms.query.SmsQuery;
import com.notrika.gympin.common.util._base.base.BaseController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface SmsController extends BaseController<SmsParam, SmsDto, SmsQuery> {

    ResponseEntity<Boolean> changeSmsStatus(@RequestBody SmsParam smsParam) throws Exception;

}
