package com.notrika.gympin.common.finance.transaction.service;

import com.notrika.gympin.common.finance.transaction.dto.TransactionAllDto;
import com.notrika.gympin.common.finance.transaction.dto.UserTransactionDto;
import com.notrika.gympin.common.finance.transaction.param.TransactionAllParam;
import com.notrika.gympin.common.finance.transaction.param.UserTransactionParam;
import com.notrika.gympin.common.finance.transaction.query.TransactionAllQuery;
import com.notrika.gympin.common.finance.transaction.query.UserTransactionQuery;
import com.notrika.gympin.common.util._base.base.BaseService;

import java.util.List;

public interface TransactionAllService extends BaseService<TransactionAllParam, TransactionAllDto, TransactionAllQuery> {

}
