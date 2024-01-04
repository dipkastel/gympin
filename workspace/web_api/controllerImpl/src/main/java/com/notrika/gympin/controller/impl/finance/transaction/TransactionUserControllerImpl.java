package com.notrika.gympin.controller.impl.finance.transaction;

import com.notrika.gympin.common.finance.transaction.api.TransactionUserController;
import com.notrika.gympin.common.finance.transaction.dto.UserTransactionDto;
import com.notrika.gympin.common.finance.transaction.param.*;
import com.notrika.gympin.common.finance.transaction.query.UserTransactionQuery;
import com.notrika.gympin.common.finance.transaction.service.UserTransactionService;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/TransactionUser")
public class TransactionUserControllerImpl implements TransactionUserController {

    @Autowired
    UserTransactionService userTransactionService;

    @Override
    public ResponseEntity<UserTransactionDto> add(UserTransactionParam transactionParam) {
        return null;
    }

    @Override
    public ResponseEntity<UserTransactionDto> update(UserTransactionParam transactionParam) {
        return null;
    }

    @Override
    public ResponseEntity<UserTransactionDto> delete(UserTransactionParam transactionParam) {
        return null;
    }

    @Override
    public ResponseEntity<List<UserTransactionDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(userTransactionService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<UserTransactionDto> getById(Long id) {
        return ResponseEntity.ok(userTransactionService.getById(id));
    }

    @Override
    public ResponseEntity<Page<UserTransactionDto>> query(UserTransactionQuery param) {
        return ResponseEntity.ok(userTransactionService.query(param));
    }
}
