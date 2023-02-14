package com.notrika.gympin.common.transaction.api;

import com.notrika.gympin.common._base.base.BaseController;
import com.notrika.gympin.common.transaction.dto.PaymentGatewaysDto;
import com.notrika.gympin.common.transaction.dto.TransactionDto;
import com.notrika.gympin.common.transaction.param.*;
import com.notrika.gympin.common.transaction.query.TransactionQuery;
import org.springframework.http.ResponseEntity;

import java.util.List;


public interface TransactionController extends BaseController<TransactionParam, TransactionDto, TransactionQuery> {
        ResponseEntity<List<TransactionDto>> getByPlaceId(Long placeId);
        ResponseEntity<Boolean> settlementRequest(PlaceSettlementRequestParam param);
        ResponseEntity<List<PaymentGatewaysDto>> getPaymentGateways(PaymentGatewaysParam param);
        ResponseEntity<String> setPaymentRequest(PaymentRequestParam param);
        ResponseEntity<Boolean> checkPayment(CheckPaymentParam param);
}
