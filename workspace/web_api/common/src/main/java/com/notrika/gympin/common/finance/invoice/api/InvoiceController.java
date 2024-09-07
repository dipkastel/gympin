package com.notrika.gympin.common.finance.invoice.api;

import com.notrika.gympin.common.finance.invoice.dto.InvoiceDto;
import com.notrika.gympin.common.finance.invoice.dto.UserHowToPayDto;
import com.notrika.gympin.common.finance.invoice.param.InvoiceBuyableParam;
import com.notrika.gympin.common.finance.invoice.param.InvoiceCheckoutParam;
import com.notrika.gympin.common.finance.invoice.param.InvoiceParam;
import com.notrika.gympin.common.finance.invoice.query.InvoiceQuery;
import com.notrika.gympin.common.user.user.dto.UserCreditDto;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.util._base.base.BaseController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

public interface InvoiceController extends BaseController<InvoiceParam, InvoiceDto, InvoiceQuery> {

    ResponseEntity<InvoiceDto> changeStatus(InvoiceParam param) throws Exception;
    ResponseEntity<InvoiceDto> getBasketByUserId(UserParam param) throws Exception;
    ResponseEntity<InvoiceDto> changeInvoiceBuyableCount(InvoiceBuyableParam param) throws Exception;
    ResponseEntity<InvoiceDto> deleteBuyable(InvoiceBuyableParam param) throws Exception;
    ResponseEntity<InvoiceDto> addBuyable(InvoiceBuyableParam param) throws Exception;
    ResponseEntity<InvoiceDto> simpleCheckout(InvoiceCheckoutParam param) throws Exception;
    ResponseEntity<InvoiceDto> moderateCheckout(InvoiceCheckoutParam param) throws Exception;
    ResponseEntity<InvoiceDto> advancedCheckout(InvoiceCheckoutParam param) throws Exception;
    ResponseEntity<InvoiceDto> userCheckout(InvoiceCheckoutParam param) throws Exception;
    ResponseEntity<UserHowToPayDto> getUserHowToPay(@RequestBody InvoiceCheckoutParam param) throws Exception;
}
