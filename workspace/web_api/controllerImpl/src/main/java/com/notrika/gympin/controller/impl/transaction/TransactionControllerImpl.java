package com.notrika.gympin.controller.impl.transaction;

import com.notrika.gympin.common._base.param.BasePagedParam;
import com.notrika.gympin.common.ticket.api.TicketController;
import com.notrika.gympin.common.ticket.dto.TicketDto;
import com.notrika.gympin.common.ticket.param.TicketCheckoutParam;
import com.notrika.gympin.common.ticket.param.TicketParam;
import com.notrika.gympin.common.ticket.query.TicketQuery;
import com.notrika.gympin.common.ticket.service.TicketService;
import com.notrika.gympin.common.transaction.api.TransactionController;
import com.notrika.gympin.common.transaction.dto.PaymentGatewaysDto;
import com.notrika.gympin.common.transaction.dto.TransactionDto;
import com.notrika.gympin.common.transaction.param.*;
import com.notrika.gympin.common.transaction.query.TransactionQuery;
import com.notrika.gympin.common.transaction.service.TransactionService;
import com.notrika.gympin.common.user.param.UserParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/transaction")
public class TransactionControllerImpl implements TransactionController {

    @Autowired
    TransactionService transactionService;

    @Override
    public ResponseEntity<TransactionDto> add(TransactionParam transactionParam) {
        return null;
    }

    @Override
    public ResponseEntity<TransactionDto> update(TransactionParam transactionParam) {
        return null;
    }

    @Override
    public ResponseEntity<TransactionDto> delete(TransactionParam transactionParam) {
        return null;
    }

    @Override
    public ResponseEntity<List<TransactionDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(transactionService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<TransactionDto> getById(Long id) {
        return ResponseEntity.ok(transactionService.getById(id));
    }

    @Override
    public ResponseEntity<Page<TransactionDto>> query(TransactionQuery param) {
        return ResponseEntity.ok(transactionService.query(param));
    }

    @Override
    @GetMapping("/getByPlaceId")
    public ResponseEntity<List<TransactionDto>> getByPlaceId(Long placeId) {
        return ResponseEntity.ok(transactionService.getByPlace(placeId));
    }

    @Override
    @PostMapping("/settlementRequest")
    public ResponseEntity<Boolean> settlementRequest(@RequestBody PlaceSettlementRequestParam param) {
        return ResponseEntity.ok(transactionService.settlementRequest(param));
    }

    @Override
    @PostMapping("/getPaymentGateways")
    public ResponseEntity<List<PaymentGatewaysDto>> getPaymentGateways(@RequestBody PaymentGatewaysParam param) {
        return ResponseEntity.ok(transactionService.getPaymentGateways(param));
    }

    @Override
    @PostMapping("/setPaymentRequest")
    public ResponseEntity<String> setPaymentRequest(@RequestBody PaymentRequestParam param) {
        return ResponseEntity.ok(transactionService.setPaymentRequest(param));
    }

    @Override
    @PostMapping("/checkPayment")
    public ResponseEntity<Boolean> checkPayment(@RequestBody CheckPaymentParam param) {
        return ResponseEntity.ok(transactionService.checkPayment(param));
    }

    @Override
    @PostMapping("/handCheckPayment")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN')")
    public ResponseEntity<Boolean> handCheckPayment(@RequestBody CheckPaymentParam param) {
        return ResponseEntity.ok(transactionService.handCheckPayment(param));
    }

    @Override
    @PostMapping("/placeSetteling")
    public ResponseEntity<Boolean> placeSetteling(@RequestBody TransactionPlaceSettelingParam param) {
        return ResponseEntity.ok(transactionService.placeSetteling(param));
    }
}
