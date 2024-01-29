package com.notrika.gympin.common.settings.note.service;

import com.notrika.gympin.common.finance.invoice.param.InvoiceParam;
import com.notrika.gympin.common.purchased.purchased.param.PurchasedParam;
import com.notrika.gympin.common.util._base.base.BaseService;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.corporate.corporate.param.CorporateParam;
import com.notrika.gympin.common.settings.note.dto.NoteDto;
import com.notrika.gympin.common.settings.note.param.NoteParam;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.purchased.purchasedSubscribe.param.PurchasedSubscribeParam;
import com.notrika.gympin.common.user.user.param.UserParam;

import java.util.List;

public interface NoteService extends BaseService<NoteParam, NoteDto, BaseQuery<?>> {
    List<NoteDto> getByPlace(PlaceParam placeParam);
    List<NoteDto> getByCorporate(CorporateParam corporateParam);
    List<NoteDto> getByInvoice(InvoiceParam corporateParam);
    List<NoteDto> getByUser(UserParam userParam);
    List<NoteDto> getByPurchased(PurchasedParam param);
}
