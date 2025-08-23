package com.notrika.gympin.controller.impl.finance.invoice;

import com.notrika.gympin.common.finance.invoice.api.InvoiceController;
import com.notrika.gympin.common.finance.invoice.dto.InvoiceDto;
import com.notrika.gympin.common.finance.invoice.dto.UserHowToPayDto;
import com.notrika.gympin.common.finance.invoice.param.*;
import com.notrika.gympin.common.finance.invoice.query.InvoiceQuery;
import com.notrika.gympin.common.finance.invoice.service.InvoiceService;
import com.notrika.gympin.common.place.placeCatering.param.PlaceCateringParam;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.util.exception.general.FunctionNotAvalable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/Invoice")
public class InvoiceControllerImpl implements InvoiceController {


    @Autowired
    InvoiceService invoiceService;

    //add empty invoice
    @Override
    public ResponseEntity<InvoiceDto> add(InvoiceParam invoiceParam) {
        return ResponseEntity.ok(invoiceService.add(invoiceParam));
    }

    @Override
    public ResponseEntity<InvoiceDto> update(InvoiceParam invoiceParam) {
        throw new FunctionNotAvalable();
    }

    @Override
    public ResponseEntity<InvoiceDto> delete(InvoiceParam invoiceParam) {
        return ResponseEntity.ok(invoiceService.delete(invoiceParam));
    }

    @Override
    public ResponseEntity<List<InvoiceDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(invoiceService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<InvoiceDto> getById(Long id) {
        return ResponseEntity.ok(invoiceService.getById(id));
    }

    @Override
    public ResponseEntity<Page<InvoiceDto>> query(InvoiceQuery param) {
        return ResponseEntity.ok(invoiceService.query(param));
    }

    @Override
    @PostMapping("changeStatus")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<InvoiceDto> changeStatus(@RequestBody InvoiceParam param) throws Exception {
        return ResponseEntity.ok(invoiceService.changeStatus(param));
    }

    @Override
    @GetMapping("sendOrderToCatering")
    public ResponseEntity<InvoiceDto> sendOrderToCatering(InvoiceParam param) throws Exception {
        return ResponseEntity.ok(invoiceService.sendOrderToCatering(param));
    }

    @Override
    @GetMapping("sendOrderToCorporate")
    public ResponseEntity<InvoiceDto> sendOrderToCorporate(InvoiceParam param) throws Exception {
        return ResponseEntity.ok(invoiceService.sendOrderToCorporate(param));
    }

    @Override
    @GetMapping("cancelOrder")
    public ResponseEntity<InvoiceDto> cancelOrder(InvoiceParam param) throws Exception {
        return ResponseEntity.ok(invoiceService.cancelOrder(param));
    }

    @Override
    @GetMapping("getPreOrderByCatering")
    public ResponseEntity<List<InvoiceDto>> getPreOrderByCatering(PlaceCateringParam param) throws Exception {
        return ResponseEntity.ok(invoiceService.getPreOrderByCatering(param));
    }

    @Override
    @GetMapping("getBasketByUserId")
    public ResponseEntity<InvoiceDto> getBasketByUserId(UserParam param) throws Exception {
        return ResponseEntity.ok(invoiceService.getBasketByUserId(param));
    }

    @Override
    @GetMapping("confirmFoodPayment")
    public ResponseEntity<InvoiceDto> confirmFoodPayment(InvoiceCheckoutParam param) throws Exception {
        return ResponseEntity.ok(invoiceService.confirmFoodPayment(param));
    }
    @Override
    @GetMapping("completeFoodPayment")
    public ResponseEntity<InvoiceDto> completeFoodPayment(InvoiceCheckoutParam param) throws Exception {
        return ResponseEntity.ok(invoiceService.completeFoodPayment(param));

    }

    @Override
    @PostMapping("changeInvoiceBuyableCount")
    public ResponseEntity<InvoiceDto> changeInvoiceBuyableCount(@RequestBody InvoiceBuyableParam param) throws Exception {
        return ResponseEntity.ok(invoiceService.changeInvoiceBuyableCount(param));
    }

    @Override
    @PostMapping("simpleCheckout")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<InvoiceDto> simpleCheckout(@RequestBody InvoiceCheckoutParam param) throws Exception {
        return ResponseEntity.ok(invoiceService.simpleCheckout(param));
    }



    @Override
    @PostMapping("moderateCheckout")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<InvoiceDto> moderateCheckout(@RequestBody InvoiceCheckoutParam param) throws Exception {
        return ResponseEntity.ok(invoiceService.moderateCheckout(param));
    }



    @Override
    @PostMapping("advancedCheckout")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<InvoiceDto> advancedCheckout(@RequestBody InvoiceCheckoutParam param) throws Exception {
        return ResponseEntity.ok(invoiceService.advancedCheckout(param));
    }


    @Override
    @PostMapping("userCheckout")
    public ResponseEntity<InvoiceDto> userCheckout(@RequestBody InvoiceCheckoutParam param) throws Exception {
        return ResponseEntity.ok(invoiceService.userCheckout(param));
    }

    @Override
    @PostMapping("SmartisCheckOut")
    public ResponseEntity<String> SmartisCheckOut(@RequestBody InvoiceCheckoutParam param) throws Exception {
        return ResponseEntity.ok(invoiceService.SmartisCheckOut(param));
    }

    @Override
    @PostMapping("getUserHowToPay")
    public ResponseEntity<UserHowToPayDto> getUserHowToPay(InvoiceCheckoutParam param) {
        return ResponseEntity.ok(invoiceService.getHowToPay(param));
    }

    @Override
    @PostMapping("addBuyable")
    public ResponseEntity<InvoiceDto> addBuyable(InvoiceBuyableParam param) throws Exception {
        return ResponseEntity.ok(invoiceService.addBuyable(param));
    }

    @Override
    @PostMapping("addFood")
    public ResponseEntity<InvoiceDto> addFood(InvoiceBuyableFoodParam param) throws Exception {
        return ResponseEntity.ok(invoiceService.addFood(param));
    }

    @Override
    @PostMapping("addSubscribe")
    public ResponseEntity<InvoiceDto> addSubscribe(InvoiceBuyableSubscribeParam param) throws Exception {
        return ResponseEntity.ok(invoiceService.addSubscribe(param));
    }

    @Override
    @PutMapping("deleteBuyable")
    public ResponseEntity<InvoiceDto> deleteBuyable(@RequestBody InvoiceBuyableParam param) {
        return ResponseEntity.ok(invoiceService.deleteBuyable(param));
    }


}
