package com.notrika.gympin.common.finance.transaction.api;

import com.notrika.gympin.common.finance.transaction.dto.UserTransactionDto;
import com.notrika.gympin.common.finance.transaction.param.*;
import com.notrika.gympin.common.finance.transaction.query.UserTransactionQuery;
import com.notrika.gympin.common.util._base.base.BaseController;


public interface TransactionUserController extends BaseController<UserTransactionParam, UserTransactionDto, UserTransactionQuery> {

}
