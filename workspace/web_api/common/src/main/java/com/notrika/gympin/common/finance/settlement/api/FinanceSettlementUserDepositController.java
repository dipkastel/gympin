package com.notrika.gympin.common.finance.settlement.api;

import com.notrika.gympin.common.finance.settlement.dto.FinanceSettlementUserDepositDto;
import com.notrika.gympin.common.finance.settlement.param.FinanceSettlementUserDepositParam;
import com.notrika.gympin.common.finance.settlement.query.FinanceSettlementUserDepositQuery;
import com.notrika.gympin.common.util._base.base.BaseController;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface FinanceSettlementUserDepositController extends BaseController<FinanceSettlementUserDepositParam, FinanceSettlementUserDepositDto, FinanceSettlementUserDepositQuery> {

    ResponseEntity<List<FinanceSettlementUserDepositDto>> getSettlementUserDeposits(Long userId);
    ResponseEntity<FinanceSettlementUserDepositDto> confirmSettlementRequest(FinanceSettlementUserDepositParam param);

}
