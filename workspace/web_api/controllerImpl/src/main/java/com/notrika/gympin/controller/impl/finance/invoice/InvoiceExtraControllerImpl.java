package com.notrika.gympin.controller.impl.finance.invoice;

import com.notrika.gympin.common.finance.invoice.api.InvoiceExtraController;
import com.notrika.gympin.common.finance.invoice.dto.InvoiceExtraDto;
import com.notrika.gympin.common.finance.invoice.param.InvoiceExtraParam;
import com.notrika.gympin.common.finance.invoice.query.InvoiceExtraQuery;
import com.notrika.gympin.common.finance.invoice.service.InvoiceExtraService;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.util.exception.general.FunctionNotAvalable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/InvoiceExtra")
public class InvoiceExtraControllerImpl implements InvoiceExtraController {


    @Autowired
    InvoiceExtraService invoiceExtraService;

    @Override
    public ResponseEntity<InvoiceExtraDto> add(InvoiceExtraParam param) {
        return ResponseEntity.ok(invoiceExtraService.add(param));
    }

    @Override
    public ResponseEntity<InvoiceExtraDto> update(InvoiceExtraParam param) {
        throw new FunctionNotAvalable();
    }

    @Override
    public ResponseEntity<InvoiceExtraDto> delete(InvoiceExtraParam param) {
        return ResponseEntity.ok(invoiceExtraService.delete(param));
    }

    @Override
    public ResponseEntity<List<InvoiceExtraDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(invoiceExtraService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<InvoiceExtraDto> getById(Long id) {
        return ResponseEntity.ok(invoiceExtraService.getById(id));
    }

    @Override
    public ResponseEntity<Page<InvoiceExtraDto>> query(InvoiceExtraQuery param) {
        return ResponseEntity.ok(invoiceExtraService.query(param));
    }

}
