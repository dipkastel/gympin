package com.notrika.gympin.controller.impl.accounting.account;

import com.notrika.gympin.common.accounting.account.api.AccountingController;
import com.notrika.gympin.common.accounting.account.dto.GatewayRequestDto;
import com.notrika.gympin.common.accounting.account.dto.OverallSportsTransactionDto;
import com.notrika.gympin.common.accounting.account.dto.SemiOverallTransactionDto;
import com.notrika.gympin.common.accounting.account.param.GatewayRequestParam;
import com.notrika.gympin.common.accounting.account.service.AccountingService;
import com.notrika.gympin.common.accounting.account.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/accounting")
public class AccountingControllerImpl implements AccountingController {

    @Autowired
    private TransactionService transactionService;

    @Override
    public ResponseEntity<SemiOverallTransactionDto> getSemiOverallTransactions() {
        return ResponseEntity.ok(transactionService.getSemiOverallTransactions());
    }

    @Override
    public ResponseEntity<OverallSportsTransactionDto> getSportsOverallTransaction() {
        return ResponseEntity.ok(transactionService.getSportsOverallTransaction());
    }

    @Override
    public ResponseEntity<GatewayRequestDto> getGatewayRequestToken(GatewayRequestParam gatewayRequestParam) {
        return null;
    }
}
