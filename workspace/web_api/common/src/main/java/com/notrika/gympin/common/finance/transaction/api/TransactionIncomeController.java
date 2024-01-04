package com.notrika.gympin.common.finance.transaction.api;

import com.notrika.gympin.common.finance.transaction.dto.IncomeTransactionDto;
import com.notrika.gympin.common.finance.transaction.dto.UserTransactionDto;
import com.notrika.gympin.common.finance.transaction.param.IncomeTransactionParam;
import com.notrika.gympin.common.finance.transaction.param.UserTransactionParam;
import com.notrika.gympin.common.finance.transaction.query.IncomeTransactionQuery;
import com.notrika.gympin.common.finance.transaction.query.UserTransactionQuery;
import com.notrika.gympin.common.util._base.base.BaseController;


public interface TransactionIncomeController extends BaseController<IncomeTransactionParam, IncomeTransactionDto, IncomeTransactionQuery> {

}
