package com.notrika.gympin.common.finance.transaction.api;

import com.notrika.gympin.common.finance.transaction.dto.TransactionPersonnelCreditDto;
import com.notrika.gympin.common.finance.transaction.dto.UserTransactionDto;
import com.notrika.gympin.common.finance.transaction.param.TransactionPersonnelCreditParam;
import com.notrika.gympin.common.finance.transaction.param.UserTransactionParam;
import com.notrika.gympin.common.finance.transaction.query.TransactionPersonnelCreditQuery;
import com.notrika.gympin.common.finance.transaction.query.UserTransactionQuery;
import com.notrika.gympin.common.util._base.base.BaseController;


public interface TransactionPersonnelCreditController extends BaseController<TransactionPersonnelCreditParam, TransactionPersonnelCreditDto, TransactionPersonnelCreditQuery> {

}
