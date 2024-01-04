package com.notrika.gympin.controller.impl.finance.IncreaseCorporateDeposit;

import com.notrika.gympin.common.finance.IncreaseCorporateDeposit.api.FinanceIncreaseCorporateDepositController;
import com.notrika.gympin.common.finance.IncreaseCorporateDeposit.dto.FinanceIncreaseCorporateDepositDto;
import com.notrika.gympin.common.finance.IncreaseCorporateDeposit.param.FinanceIncreaseCorporateDepositParam;
import com.notrika.gympin.common.finance.IncreaseCorporateDeposit.param.RequestIncreaseCorporateDepositParam;
import com.notrika.gympin.common.finance.IncreaseCorporateDeposit.query.FinanceIncreaseCorporateDepositQuery;
import com.notrika.gympin.common.finance.IncreaseCorporateDeposit.service.FinanceIncreaseCorporateDepositService;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/increaseCorporateDeposit")
public class FinanceIncreaseCorporateDepositControllerImpl implements FinanceIncreaseCorporateDepositController {



    @Autowired
    private FinanceIncreaseCorporateDepositService increaseCorporateDepositService;

    @Override
    public ResponseEntity<FinanceIncreaseCorporateDepositDto> add(FinanceIncreaseCorporateDepositParam param) {
        return ResponseEntity.ok(increaseCorporateDepositService.add(param));
    }

    @Override
    public ResponseEntity<FinanceIncreaseCorporateDepositDto> update(FinanceIncreaseCorporateDepositParam param) {
        return ResponseEntity.ok(increaseCorporateDepositService.update(param));
    }

    @Override
    public ResponseEntity<FinanceIncreaseCorporateDepositDto> delete(FinanceIncreaseCorporateDepositParam param) {
        return ResponseEntity.ok(increaseCorporateDepositService.delete(param));
    }

    @Override
    public ResponseEntity<List<FinanceIncreaseCorporateDepositDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(increaseCorporateDepositService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<FinanceIncreaseCorporateDepositDto> getById(Long id) {
        return ResponseEntity.ok(increaseCorporateDepositService.getById(id));
    }

    @Override
    public ResponseEntity<Page<FinanceIncreaseCorporateDepositDto>> query(FinanceIncreaseCorporateDepositQuery param) {
        return ResponseEntity.ok(increaseCorporateDepositService.query(param));
    }



    @Override
    @GetMapping("getCreditByCorporate")
    public ResponseEntity<List<FinanceIncreaseCorporateDepositDto>> getIncreaseCorporateDeposits(Long corporateId) {
        return ResponseEntity.ok(increaseCorporateDepositService.getIncreaseCorporateDeposits(corporateId));
    }

    @Override
    @PostMapping("confirmIncreaseRequest")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<FinanceIncreaseCorporateDepositDto> confirmIncreaseRequest(@RequestBody FinanceIncreaseCorporateDepositParam param) {
        return ResponseEntity.ok(increaseCorporateDepositService.confirmIncreaseRequest(param));
    }

    @Override
    @PostMapping("requestIncreaseCorporateDeposits")
    public ResponseEntity<String> requestIncreaseCorporateDeposits(@RequestBody RequestIncreaseCorporateDepositParam param) {
        return ResponseEntity.ok(increaseCorporateDepositService.requestIncreaseCorporateDeposits(param));
    }

}
