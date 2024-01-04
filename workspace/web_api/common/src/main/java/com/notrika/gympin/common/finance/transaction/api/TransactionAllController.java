package com.notrika.gympin.common.finance.transaction.api;

import com.notrika.gympin.common.finance.transaction.dto.TransactionAllDto;
import com.notrika.gympin.common.finance.transaction.dto.UserTransactionDto;
import com.notrika.gympin.common.finance.transaction.param.TransactionAllParam;
import com.notrika.gympin.common.finance.transaction.param.UserTransactionParam;
import com.notrika.gympin.common.finance.transaction.query.TransactionAllQuery;
import com.notrika.gympin.common.finance.transaction.query.UserTransactionQuery;
import com.notrika.gympin.common.util._base.base.BaseController;


public interface TransactionAllController extends BaseController<TransactionAllParam, TransactionAllDto, TransactionAllQuery> {


}
