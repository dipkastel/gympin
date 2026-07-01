package com.notrika.gympin.common.finance.transaction.service;

import com.notrika.gympin.common.finance.transaction.dto.IncomeTransactionDto;
import com.notrika.gympin.common.finance.transaction.dto.MonthIncomeDto;
import com.notrika.gympin.common.finance.transaction.param.IncomeTransactionParam;
import com.notrika.gympin.common.finance.transaction.query.IncomeTransactionQuery;
import com.notrika.gympin.common.util._base.base.BaseService;

import java.util.List;

public interface IncomeTransactionService extends BaseService<IncomeTransactionParam, IncomeTransactionDto, IncomeTransactionQuery> {

    List<MonthIncomeDto> getByMonth();
}
