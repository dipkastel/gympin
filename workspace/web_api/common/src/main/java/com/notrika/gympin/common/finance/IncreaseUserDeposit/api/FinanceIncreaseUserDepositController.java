package com.notrika.gympin.common.finance.IncreaseUserDeposit.api;

import com.notrika.gympin.common.finance.IncreaseCorporateDeposit.param.RequestIncreaseCorporateDepositParam;
import com.notrika.gympin.common.finance.IncreaseUserDeposit.dto.FinanceIncreaseUserDepositDto;
import com.notrika.gympin.common.finance.IncreaseUserDeposit.param.FinanceIncreaseUserDepositParam;
import com.notrika.gympin.common.finance.IncreaseUserDeposit.param.RequestIncreaseUserDepositParam;
import com.notrika.gympin.common.finance.IncreaseUserDeposit.query.FinanceIncreaseUserDepositQuery;
import com.notrika.gympin.common.finance.transaction.dto.FinanceUserDto;
import com.notrika.gympin.common.finance.transaction.param.FinanceUserParam;
import com.notrika.gympin.common.util._base.base.BaseController;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface FinanceIncreaseUserDepositController extends BaseController<FinanceIncreaseUserDepositParam, FinanceIncreaseUserDepositDto, FinanceIncreaseUserDepositQuery> {

    ResponseEntity<String> requestIncreaseUserDeposits(RequestIncreaseUserDepositParam request);
    ResponseEntity<List<FinanceIncreaseUserDepositDto>> getIncreaseUserDeposits(Long userId);
    ResponseEntity<FinanceIncreaseUserDepositDto> confirmIncreaseRequest(FinanceIncreaseUserDepositParam param);

}
