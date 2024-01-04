package com.notrika.gympin.common.finance.IncreaseUserDeposit.service;

import com.notrika.gympin.common.finance.IncreaseUserDeposit.dto.FinanceIncreaseUserDepositDto;
import com.notrika.gympin.common.finance.IncreaseUserDeposit.param.FinanceIncreaseUserDepositParam;
import com.notrika.gympin.common.finance.IncreaseUserDeposit.param.RequestIncreaseUserDepositParam;
import com.notrika.gympin.common.finance.IncreaseUserDeposit.query.FinanceIncreaseUserDepositQuery;
import com.notrika.gympin.common.util._base.base.BaseService;

import java.util.List;

public interface FinanceIncreaseUserDepositService extends BaseService<FinanceIncreaseUserDepositParam, FinanceIncreaseUserDepositDto, FinanceIncreaseUserDepositQuery> {


    List<FinanceIncreaseUserDepositDto> getIncreaseUserDeposits(Long userId);
    FinanceIncreaseUserDepositDto confirmIncreaseRequest(FinanceIncreaseUserDepositParam param);
    String requestIncreaseUserDeposits(RequestIncreaseUserDepositParam request);
}
