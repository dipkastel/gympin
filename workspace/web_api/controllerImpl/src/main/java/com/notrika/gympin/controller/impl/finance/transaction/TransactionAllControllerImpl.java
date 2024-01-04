package com.notrika.gympin.controller.impl.finance.transaction;

import com.notrika.gympin.common.finance.transaction.api.TransactionAllController;
import com.notrika.gympin.common.finance.transaction.dto.TransactionAllDto;
import com.notrika.gympin.common.finance.transaction.param.TransactionAllParam;
import com.notrika.gympin.common.finance.transaction.query.TransactionAllQuery;
import com.notrika.gympin.common.finance.transaction.service.TransactionAllService;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/TransactionAll")
public class TransactionAllControllerImpl implements TransactionAllController {

    @Autowired
    TransactionAllService transactionAllService;

    @Override
    public ResponseEntity<TransactionAllDto> add(TransactionAllParam param) {
        return null;
    }

    @Override
    public ResponseEntity<TransactionAllDto> update(TransactionAllParam param) {
        return null;
    }

    @Override
    public ResponseEntity<TransactionAllDto> delete(TransactionAllParam param) {
        return null;
    }

    @Override
    public ResponseEntity<List<TransactionAllDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(transactionAllService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<TransactionAllDto> getById(Long id) {
        return ResponseEntity.ok(transactionAllService.getById(id));
    }

    @Override
    public ResponseEntity<Page<TransactionAllDto>> query(TransactionAllQuery param) {
        return ResponseEntity.ok(transactionAllService.query(param));
    }
}
