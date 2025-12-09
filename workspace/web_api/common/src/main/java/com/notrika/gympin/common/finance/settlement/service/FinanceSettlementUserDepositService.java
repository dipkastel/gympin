package com.notrika.gympin.common.finance.settlement.service;

import com.notrika.gympin.common.finance.IncreaseUserDeposit.dto.FinanceIncreaseUserDepositDto;
import com.notrika.gympin.common.finance.IncreaseUserDeposit.param.FinanceIncreaseUserDepositParam;
import com.notrika.gympin.common.finance.IncreaseUserDeposit.query.FinanceIncreaseUserDepositQuery;
import com.notrika.gympin.common.finance.settlement.dto.FinanceSettlementUserDepositDto;
import com.notrika.gympin.common.finance.settlement.param.FinanceSettlementUserDepositParam;
import com.notrika.gympin.common.finance.settlement.query.FinanceSettlementUserDepositQuery;
import com.notrika.gympin.common.finance.transaction.dto.FinanceUserDto;
import com.notrika.gympin.common.util._base.base.BaseService;

import java.util.List;

public interface FinanceSettlementUserDepositService extends BaseService<FinanceSettlementUserDepositParam, FinanceSettlementUserDepositDto, FinanceSettlementUserDepositQuery> {


    List<FinanceSettlementUserDepositDto> getSettlementUserDeposits(Long userId);
    FinanceSettlementUserDepositDto confirmSettlementRequest(FinanceSettlementUserDepositParam param);
    List<FinanceUserDto> getAllCreditors();

}
