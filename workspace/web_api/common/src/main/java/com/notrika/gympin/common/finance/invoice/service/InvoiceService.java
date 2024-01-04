package com.notrika.gympin.common.finance.invoice.service;

import com.notrika.gympin.common.finance.invoice.dto.InvoiceDto;
import com.notrika.gympin.common.finance.invoice.param.InvoiceBuyableParam;
import com.notrika.gympin.common.finance.invoice.param.InvoiceCheckoutParam;
import com.notrika.gympin.common.finance.invoice.param.InvoiceParam;
import com.notrika.gympin.common.finance.invoice.query.InvoiceQuery;
import com.notrika.gympin.common.purchased.purchasedSubscribe.dto.PurchasedSubscribeDto;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.util._base.base.BaseService;
import org.springframework.web.bind.annotation.RequestBody;

public interface InvoiceService extends BaseService<InvoiceParam, InvoiceDto, InvoiceQuery> {

    InvoiceDto changeStatus(InvoiceParam param);
    InvoiceDto changeInvoiceBuyableCount(InvoiceBuyableParam param);
    InvoiceDto addBuyable(InvoiceBuyableParam param);
    InvoiceDto deleteBuyable(InvoiceBuyableParam param);
    InvoiceDto checkout(InvoiceCheckoutParam param) throws Exception;
    InvoiceDto userCheckout(InvoiceCheckoutParam param) throws Exception;

}
