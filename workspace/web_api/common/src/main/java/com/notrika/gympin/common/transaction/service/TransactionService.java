package com.notrika.gympin.common.transaction.service;

import com.notrika.gympin.common._base.base.BaseService;
import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.transaction.dto.PaymentGatewaysDto;
import com.notrika.gympin.common.transaction.dto.TransactionDto;
import com.notrika.gympin.common.transaction.param.*;
import com.notrika.gympin.common.transaction.query.TransactionQuery;

import java.math.BigDecimal;
import java.util.List;

public interface TransactionService extends BaseService<TransactionParam, TransactionDto, TransactionQuery> {
    List<TransactionDto> getByPlace(Long placeId);
    List<TransactionDto> getByCorporate(Long corporateId);
    List<TransactionDto> getByUser(Long userId);
    List<TransactionDto> getByPersonel(Long personnelId);
    Boolean settlementRequest(PlaceSettlementRequestParam param);

    List<PaymentGatewaysDto> getPaymentGateways(PaymentGatewaysParam param);
    String setPaymentRequest(PaymentRequestParam param);
    Boolean checkPayment(CheckPaymentParam param);
    Boolean handCheckPayment(CheckPaymentParam param);
    Boolean placeSetteling(TransactionPlaceSettelingParam param);
}
