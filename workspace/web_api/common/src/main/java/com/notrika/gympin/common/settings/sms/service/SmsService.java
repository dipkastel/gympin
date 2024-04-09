package com.notrika.gympin.common.settings.sms.service;

import com.notrika.gympin.common.corporate.corporate.param.CorporateParam;
import com.notrika.gympin.common.finance.invoice.param.InvoiceParam;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.purchased.purchased.param.PurchasedParam;
import com.notrika.gympin.common.settings.note.dto.NoteDto;
import com.notrika.gympin.common.settings.note.dto.SimpleNoteDto;
import com.notrika.gympin.common.settings.note.param.NoteParam;
import com.notrika.gympin.common.settings.note.query.NoteQuery;
import com.notrika.gympin.common.settings.sms.dto.SmsDto;
import com.notrika.gympin.common.settings.sms.param.SmsParam;
import com.notrika.gympin.common.settings.sms.query.SmsQuery;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.util._base.base.BaseService;

import java.util.List;

public interface SmsService extends BaseService<SmsParam, SmsDto, SmsQuery> {
    boolean changeSmsStatus(SmsParam smsParam) throws Exception;
}
