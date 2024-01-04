package com.notrika.gympin.controller.impl.finance.transaction;

import com.notrika.gympin.common.finance.transaction.api.TransactionCorporateController;
import com.notrika.gympin.common.finance.transaction.dto.CorporateTransactionDto;
import com.notrika.gympin.common.finance.transaction.param.CorporateTransactionParam;
import com.notrika.gympin.common.finance.transaction.query.CorporateTransactionQuery;
import com.notrika.gympin.common.finance.transaction.service.CorporateTransactionService;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/TransactionCorporate")
public class TransactionCorporateControllerImpl implements TransactionCorporateController {

    @Autowired
    CorporateTransactionService corporateTransactionService;

    @Override
    public ResponseEntity<CorporateTransactionDto> add(CorporateTransactionParam transactionParam) {
        return null;
    }

    @Override
    public ResponseEntity<CorporateTransactionDto> update(CorporateTransactionParam transactionParam) {
        return null;
    }

    @Override
    public ResponseEntity<CorporateTransactionDto> delete(CorporateTransactionParam transactionParam) {
        return null;
    }

    @Override
    public ResponseEntity<List<CorporateTransactionDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(corporateTransactionService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<CorporateTransactionDto> getById(Long id) {
        return ResponseEntity.ok(corporateTransactionService.getById(id));
    }

    @Override
    public ResponseEntity<Page<CorporateTransactionDto>> query(CorporateTransactionQuery param) {
        return ResponseEntity.ok(corporateTransactionService.query(param));
    }

//    @Override
//    @GetMapping("/getByPlaceId")
//    public ResponseEntity<List<CorporateTransactionDto>> getByPlaceId(Long placeId) {
//        return ResponseEntity.ok(transactionService.getByPlace(placeId));
//    }
//
//    @Override
//    @PostMapping("/settlementRequest")
//    public ResponseEntity<Boolean> settlementRequest(@RequestBody UserSettlementRequestParam param) {
//        return ResponseEntity.ok(transactionService.settlementRequest(param));
//    }
//
//    @Override
//    @PostMapping("/getPaymentGateways")
//    public ResponseEntity<List<GatewaysDto>> getPaymentGateways(@RequestBody GatewaysParam param) {
//        return ResponseEntity.ok(transactionService.getPaymentGateways(param));
//    }
//
//    @Override
//    @PostMapping("/setPaymentRequest")
//    public ResponseEntity<String> setPaymentRequest(@RequestBody RequestIncreaseCorporateDepositParam param) {
//        return ResponseEntity.ok(transactionService.setPaymentRequest(param));
//    }
//
//    @Override
//    @PostMapping("/handCheckPayment")
//    @PreAuthorize("hasAnyRole('SUPER_ADMIN')")
//    public ResponseEntity<Boolean> handCheckPayment(@RequestBody CheckPaymentParam param) {
//        return ResponseEntity.ok(transactionService.handCheckPayment(param));
//    }
//
//    @Override
//    @PostMapping("/placeSetteling")
//    public ResponseEntity<Boolean> placeSetteling(@RequestBody TransactionPlaceSettelingParam param) {
//        return ResponseEntity.ok(transactionService.placeSetteling(param));
//    }
}
