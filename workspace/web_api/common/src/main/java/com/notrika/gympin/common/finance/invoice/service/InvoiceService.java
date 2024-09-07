package com.notrika.gympin.common.finance.invoice.service;

import com.notrika.gympin.common.finance.invoice.dto.InvoiceDto;
import com.notrika.gympin.common.finance.invoice.dto.UserHowToPayDto;
import com.notrika.gympin.common.finance.invoice.param.InvoiceBuyableParam;
import com.notrika.gympin.common.finance.invoice.param.InvoiceCheckoutParam;
import com.notrika.gympin.common.finance.invoice.param.InvoiceParam;
import com.notrika.gympin.common.finance.invoice.query.InvoiceQuery;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.util._base.base.BaseService;

public interface InvoiceService extends BaseService<InvoiceParam, InvoiceDto, InvoiceQuery> {

    InvoiceDto changeStatus(InvoiceParam param);
    InvoiceDto changeInvoiceBuyableCount(InvoiceBuyableParam param);
    InvoiceDto addBuyable(InvoiceBuyableParam param);
    InvoiceDto deleteBuyable(InvoiceBuyableParam param);
    InvoiceDto simpleCheckout(InvoiceCheckoutParam param) throws Exception;
    InvoiceDto moderateCheckout(InvoiceCheckoutParam param) throws Exception;
    InvoiceDto advancedCheckout(InvoiceCheckoutParam param) throws Exception;
    InvoiceDto userCheckout(InvoiceCheckoutParam param) throws Exception;
    UserHowToPayDto getHowToPay(InvoiceCheckoutParam param);

    InvoiceDto getBasketByUserId(UserParam param);
}
