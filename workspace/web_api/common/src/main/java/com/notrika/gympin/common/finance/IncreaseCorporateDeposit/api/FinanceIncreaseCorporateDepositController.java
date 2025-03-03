package com.notrika.gympin.common.finance.IncreaseCorporateDeposit.api;

import com.notrika.gympin.common.finance.IncreaseCorporateDeposit.dto.FinanceIncreaseCorporateDepositDto;
import com.notrika.gympin.common.finance.IncreaseCorporateDeposit.param.FinanceIncreaseCorporateDepositParam;
import com.notrika.gympin.common.finance.IncreaseCorporateDeposit.param.RequestIncreaseCorporateDepositParam;
import com.notrika.gympin.common.finance.IncreaseCorporateDeposit.query.FinanceIncreaseCorporateDepositQuery;
import com.notrika.gympin.common.util._base.base.BaseController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

public interface FinanceIncreaseCorporateDepositController extends BaseController<FinanceIncreaseCorporateDepositParam, FinanceIncreaseCorporateDepositDto, FinanceIncreaseCorporateDepositQuery> {

    ResponseEntity<String> requestIncreaseCorporateDeposits(@RequestBody RequestIncreaseCorporateDepositParam request);
    ResponseEntity<List<FinanceIncreaseCorporateDepositDto>> getIncreaseCorporateDeposits(Long corporate);
    ResponseEntity<FinanceIncreaseCorporateDepositDto> confirmIncreaseRequest(@RequestBody FinanceIncreaseCorporateDepositParam param);
    ResponseEntity<String> completeRequestIncreaseCorporateDeposits(@RequestBody RequestIncreaseCorporateDepositParam param);
    ResponseEntity<FinanceIncreaseCorporateDepositDto> requestIncreaseCorporateDepositsDraft(@RequestBody RequestIncreaseCorporateDepositParam request);
    void getProFormaInvoice(HttpServletResponse response, RequestIncreaseCorporateDepositParam param) throws Exception;
}
