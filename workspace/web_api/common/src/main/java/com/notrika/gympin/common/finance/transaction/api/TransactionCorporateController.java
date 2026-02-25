package com.notrika.gympin.common.finance.transaction.api;

import com.notrika.gympin.common.finance.transaction.dto.CorporateTransactionDto;
import com.notrika.gympin.common.finance.transaction.param.*;
import com.notrika.gympin.common.finance.transaction.query.CorporateTransactionQuery;
import com.notrika.gympin.common.util._base.base.BaseController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;


public interface TransactionCorporateController extends BaseController<CorporateTransactionParam, CorporateTransactionDto, CorporateTransactionQuery> {
//        ResponseEntity<List<TransactionDto>> getByPlaceId(Long placeId);
//        ResponseEntity<Boolean> settlementRequest(UserSettlementRequestParam param);
//        ResponseEntity<String> setPaymentRequest(RequestIncreaseCorporateDepositParam param);
//        ResponseEntity<Boolean> handCheckPayment(CheckPaymentParam param);
//        ResponseEntity<Boolean> placeSetteling(TransactionPlaceSettelingParam param);
          byte[] queryExport(@RequestBody CorporateTransactionQuery param) throws Exception;
}
