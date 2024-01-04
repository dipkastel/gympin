package com.notrika.gympin.controller.impl.finance.invoice;

import com.notrika.gympin.common.finance.invoice.api.InvoiceController;
import com.notrika.gympin.common.finance.invoice.dto.InvoiceDto;
import com.notrika.gympin.common.finance.invoice.param.InvoiceBuyableParam;
import com.notrika.gympin.common.finance.invoice.param.InvoiceCheckoutParam;
import com.notrika.gympin.common.finance.invoice.param.InvoiceParam;
import com.notrika.gympin.common.finance.invoice.query.InvoiceQuery;
import com.notrika.gympin.common.finance.invoice.service.InvoiceService;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
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
        return null;
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
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
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
    @PostMapping("changeInvoiceBuyableCount")
    public ResponseEntity<InvoiceDto> changeInvoiceBuyableCount(@RequestBody InvoiceBuyableParam param) throws Exception {
        return ResponseEntity.ok(invoiceService.changeInvoiceBuyableCount(param));
    }

    @Override
    @PostMapping("checkout")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<InvoiceDto> checkout(@RequestBody InvoiceCheckoutParam param) throws Exception {
        return ResponseEntity.ok(invoiceService.checkout(param));
    }


    @Override
    @PostMapping("userCheckout")
    public ResponseEntity<InvoiceDto> userCheckout(@RequestBody InvoiceCheckoutParam param) throws Exception {
        return ResponseEntity.ok(invoiceService.userCheckout(param));
    }

    @Override
    @PostMapping("addBuyable")
    public ResponseEntity<InvoiceDto> addBuyable(@RequestBody InvoiceBuyableParam param) throws Exception {
        return ResponseEntity.ok(invoiceService.addBuyable(param));
    }

    @Override
    @PutMapping("deleteBuyable")
    public ResponseEntity<InvoiceDto> deleteBuyable(@RequestBody InvoiceBuyableParam param) {
        return ResponseEntity.ok(invoiceService.deleteBuyable(param));
    }


}
