package com.notrika.gympin.common.finance.transaction.service;

import com.notrika.gympin.common.finance.transaction.dto.UserTransactionDto;
import com.notrika.gympin.common.finance.transaction.param.*;
import com.notrika.gympin.common.finance.transaction.query.UserTransactionQuery;
import com.notrika.gympin.common.util._base.base.BaseService;

import java.util.List;

public interface UserTransactionService extends BaseService<UserTransactionParam, UserTransactionDto, UserTransactionQuery> {

    List<UserTransactionDto> getByUser(Long userId);
//    Boolean settlementRequest(UserSettlementRequestParam param);
//
//    List<GatewaysDto> getPaymentGateways(GatewaysParam param);
//    String setPaymentRequest(RequestIncreaseCorporateDepositParam param);
//    Boolean handCheckPayment(CheckPaymentParam param);
//    Boolean placeSetteling(TransactionPlaceSettelingParam param);
}
