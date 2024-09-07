package com.notrika.gympin.controller.impl.finance.transaction;

import com.notrika.gympin.common.finance.transaction.api.TransactionPersonnelCreditController;
import com.notrika.gympin.common.finance.transaction.dto.TransactionPersonnelCreditDto;
import com.notrika.gympin.common.finance.transaction.param.TransactionPersonnelCreditParam;
import com.notrika.gympin.common.finance.transaction.query.TransactionPersonnelCreditQuery;
import com.notrika.gympin.common.finance.transaction.service.TransactionPersonnelCreditService;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/TransactionPersonnelCredit")
public class TransactionPersonnelCreditControllerImpl implements TransactionPersonnelCreditController {

    @Autowired
    TransactionPersonnelCreditService transactionPersonnelCreditService;

    @Override
    public ResponseEntity<TransactionPersonnelCreditDto> add(TransactionPersonnelCreditParam param) {
        return null;
    }

    @Override
    public ResponseEntity<TransactionPersonnelCreditDto> update(TransactionPersonnelCreditParam param) {
        return null;
    }

    @Override
    public ResponseEntity<TransactionPersonnelCreditDto> delete(TransactionPersonnelCreditParam param) {
        return null;
    }

    @Override
    public ResponseEntity<List<TransactionPersonnelCreditDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(transactionPersonnelCreditService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<TransactionPersonnelCreditDto> getById(Long id) {
        return ResponseEntity.ok(transactionPersonnelCreditService.getById(id));
    }

    @Override
    public ResponseEntity<Page<TransactionPersonnelCreditDto>> query(TransactionPersonnelCreditQuery param) {
        return ResponseEntity.ok(transactionPersonnelCreditService.query(param));
    }
}
