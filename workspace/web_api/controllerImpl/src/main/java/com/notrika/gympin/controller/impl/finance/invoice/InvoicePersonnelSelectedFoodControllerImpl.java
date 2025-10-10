package com.notrika.gympin.controller.impl.finance.invoice;

import com.notrika.gympin.common.finance.invoice.api.InvoicePersonnelSelectedFoodController;
import com.notrika.gympin.common.finance.invoice.dto.InvoicePersonnelSelectedFoodDto;
import com.notrika.gympin.common.finance.invoice.param.InvoicePersonnelSelectedFoodParam;
import com.notrika.gympin.common.finance.invoice.query.InvoicePersonnelSelectedFoodQuery;
import com.notrika.gympin.common.finance.invoice.service.InvoicePersonnelSelectedFoodService;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.util.exception.general.FunctionNotAvalable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/v1/personnelFood")
public class InvoicePersonnelSelectedFoodControllerImpl implements InvoicePersonnelSelectedFoodController {


    @Autowired
    InvoicePersonnelSelectedFoodService selectedFoodService;

    @Override
    public ResponseEntity<InvoicePersonnelSelectedFoodDto> add(InvoicePersonnelSelectedFoodParam param) {
        return ResponseEntity.ok(selectedFoodService.add(param));
    }

    @Override
    public ResponseEntity<InvoicePersonnelSelectedFoodDto> update(InvoicePersonnelSelectedFoodParam param) {
        throw new FunctionNotAvalable();
    }

    @Override
    public ResponseEntity<InvoicePersonnelSelectedFoodDto> delete(InvoicePersonnelSelectedFoodParam param) {
        return ResponseEntity.ok(selectedFoodService.delete(param));
    }

    @Override
    public ResponseEntity<List<InvoicePersonnelSelectedFoodDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(selectedFoodService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<InvoicePersonnelSelectedFoodDto> getById(Long id) {
        return ResponseEntity.ok(selectedFoodService.getById(id));
    }

    @Override
    public ResponseEntity<Page<InvoicePersonnelSelectedFoodDto>> query(InvoicePersonnelSelectedFoodQuery param) {
        return ResponseEntity.ok(selectedFoodService.query(param));
    }

}
