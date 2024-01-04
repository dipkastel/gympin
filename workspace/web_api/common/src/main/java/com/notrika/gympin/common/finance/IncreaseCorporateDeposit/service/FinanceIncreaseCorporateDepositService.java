package com.notrika.gympin.common.finance.IncreaseCorporateDeposit.service;

import com.notrika.gympin.common.finance.IncreaseCorporateDeposit.dto.FinanceIncreaseCorporateDepositDto;
import com.notrika.gympin.common.finance.IncreaseCorporateDeposit.param.FinanceIncreaseCorporateDepositParam;
import com.notrika.gympin.common.finance.IncreaseCorporateDeposit.param.RequestIncreaseCorporateDepositParam;
import com.notrika.gympin.common.finance.IncreaseCorporateDeposit.query.FinanceIncreaseCorporateDepositQuery;
import com.notrika.gympin.common.finance.IncreaseUserDeposit.dto.FinanceIncreaseUserDepositDto;
import com.notrika.gympin.common.finance.IncreaseUserDeposit.param.FinanceIncreaseUserDepositParam;
import com.notrika.gympin.common.finance.IncreaseUserDeposit.query.FinanceIncreaseUserDepositQuery;
import com.notrika.gympin.common.util._base.base.BaseService;

import java.util.List;

public interface FinanceIncreaseCorporateDepositService extends BaseService<FinanceIncreaseCorporateDepositParam, FinanceIncreaseCorporateDepositDto, FinanceIncreaseCorporateDepositQuery> {


    List<FinanceIncreaseCorporateDepositDto> getIncreaseCorporateDeposits(Long corporateId);
    FinanceIncreaseCorporateDepositDto confirmIncreaseRequest(FinanceIncreaseCorporateDepositParam param);
    String requestIncreaseCorporateDeposits(RequestIncreaseCorporateDepositParam param);

}
