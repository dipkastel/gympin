package com.notrika.gympin.controller.impl.finance.transaction;

import com.notrika.gympin.common.finance.transaction.api.TransactionIncomeController;
import com.notrika.gympin.common.finance.transaction.api.TransactionUserController;
import com.notrika.gympin.common.finance.transaction.dto.IncomeTransactionDto;
import com.notrika.gympin.common.finance.transaction.dto.UserTransactionDto;
import com.notrika.gympin.common.finance.transaction.param.IncomeTransactionParam;
import com.notrika.gympin.common.finance.transaction.param.UserTransactionParam;
import com.notrika.gympin.common.finance.transaction.query.IncomeTransactionQuery;
import com.notrika.gympin.common.finance.transaction.query.UserTransactionQuery;
import com.notrika.gympin.common.finance.transaction.service.IncomeTransactionService;
import com.notrika.gympin.common.finance.transaction.service.UserTransactionService;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/TransactionIncome")
public class TransactionIncomeControllerImpl implements TransactionIncomeController {

    @Autowired
    IncomeTransactionService incomeTransactionService;

    @Override
    public ResponseEntity<IncomeTransactionDto> add(IncomeTransactionParam param) {
        return null;
    }

    @Override
    public ResponseEntity<IncomeTransactionDto> update(IncomeTransactionParam param) {
        return null;
    }

    @Override
    public ResponseEntity<IncomeTransactionDto> delete(IncomeTransactionParam param) {
        return null;
    }

    @Override
    public ResponseEntity<List<IncomeTransactionDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(incomeTransactionService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<IncomeTransactionDto> getById(Long id) {
        return ResponseEntity.ok(incomeTransactionService.getById(id));
    }

    @Override
    public ResponseEntity<Page<IncomeTransactionDto>> query(IncomeTransactionQuery param) {
        return ResponseEntity.ok(incomeTransactionService.query(param));
    }
}
