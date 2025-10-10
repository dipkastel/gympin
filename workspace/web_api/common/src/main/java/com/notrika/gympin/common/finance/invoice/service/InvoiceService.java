package com.notrika.gympin.common.finance.invoice.service;

import com.notrika.gympin.common.finance.invoice.dto.InvoiceDto;
import com.notrika.gympin.common.finance.invoice.dto.UserHowToPayDto;
import com.notrika.gympin.common.finance.invoice.param.*;
import com.notrika.gympin.common.finance.invoice.query.InvoiceQuery;
import com.notrika.gympin.common.place.placeCatering.param.PlaceCateringParam;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.util._base.base.BaseService;

import java.util.List;

public interface InvoiceService extends BaseService<InvoiceParam, InvoiceDto, InvoiceQuery> {

    InvoiceDto changeStatus(InvoiceParam param);
    InvoiceDto sendOrderToCatering(InvoiceParam param);
    InvoiceDto sendOrderToCorporate(InvoiceParam param);
    InvoiceDto cancelOrder(InvoiceParam param);
    InvoiceDto changeInvoiceBuyableCount(InvoiceBuyableParam param);
    InvoiceDto addBuyable(InvoiceBuyableParam param);
    InvoiceDto addFood(InvoiceBuyableFoodParam param);
    InvoiceDto addSubscribe(InvoiceBuyableSubscribeParam param);
    InvoiceDto deleteBuyable(InvoiceBuyableParam param);
    InvoiceDto simpleCheckout(InvoiceCheckoutParam param) throws Exception;
    InvoiceDto moderateCheckout(InvoiceCheckoutParam param) throws Exception;
    InvoiceDto advancedCheckout(InvoiceCheckoutParam param) throws Exception;
    InvoiceDto userCheckout(InvoiceCheckoutParam param) throws Exception;
    InvoiceDto confirmFoodPayment(InvoiceCheckoutParam param) throws Exception;
    InvoiceDto completeFoodPayment(InvoiceCheckoutParam param) throws Exception;
    InvoiceDto getFoodBasket(InvoiceParam param) throws Exception;
    UserHowToPayDto getHowToPay(InvoiceCheckoutParam param);
    InvoiceDto getBasketByUserId(UserParam param);
    List<InvoiceDto> getPreOrderByCatering(PlaceCateringParam param);
    String SmartisCheckOut(InvoiceCheckoutParam param) throws Exception;
}
