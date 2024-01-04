package com.notrika.gympin.controller.impl.finance.IncreaseUserDeposit;

import com.notrika.gympin.common.finance.IncreaseUserDeposit.api.FinanceIncreaseUserDepositController;
import com.notrika.gympin.common.finance.IncreaseUserDeposit.dto.FinanceIncreaseUserDepositDto;
import com.notrika.gympin.common.finance.IncreaseUserDeposit.param.FinanceIncreaseUserDepositParam;
import com.notrika.gympin.common.finance.IncreaseUserDeposit.param.RequestIncreaseUserDepositParam;
import com.notrika.gympin.common.finance.IncreaseUserDeposit.query.FinanceIncreaseUserDepositQuery;
import com.notrika.gympin.common.finance.IncreaseUserDeposit.service.FinanceIncreaseUserDepositService;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/increaseUserDeposit")
public class FinanceIncreaseUserDepositControllerImpl implements FinanceIncreaseUserDepositController {


    @Autowired
    private FinanceIncreaseUserDepositService IncreaseUserDepositService;

    @Override
    public ResponseEntity<FinanceIncreaseUserDepositDto> add(FinanceIncreaseUserDepositParam param) {
        return ResponseEntity.ok(IncreaseUserDepositService.add(param));
    }

    @Override
    public ResponseEntity<FinanceIncreaseUserDepositDto> update(FinanceIncreaseUserDepositParam param) {
        return ResponseEntity.ok(IncreaseUserDepositService.update(param));
    }

    @Override
    public ResponseEntity<FinanceIncreaseUserDepositDto> delete(FinanceIncreaseUserDepositParam param) {
        return ResponseEntity.ok(IncreaseUserDepositService.delete(param));
    }

    @Override
    public ResponseEntity<List<FinanceIncreaseUserDepositDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(IncreaseUserDepositService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<FinanceIncreaseUserDepositDto> getById(Long id) {
        return ResponseEntity.ok(IncreaseUserDepositService.getById(id));
    }

    @Override
    public ResponseEntity<Page<FinanceIncreaseUserDepositDto>> query(FinanceIncreaseUserDepositQuery param) {
        return ResponseEntity.ok(IncreaseUserDepositService.query(param));
    }


    @Override
    @PostMapping("requestIncreaseUserDeposits")
    public ResponseEntity<String> requestIncreaseUserDeposits(@RequestBody RequestIncreaseUserDepositParam request) {
        return ResponseEntity.ok(IncreaseUserDepositService.requestIncreaseUserDeposits(request));
    }

    @Override
    @GetMapping("getCreditByUser")
    public ResponseEntity<List<FinanceIncreaseUserDepositDto>> getIncreaseUserDeposits(Long userId) {
        return ResponseEntity.ok(IncreaseUserDepositService.getIncreaseUserDeposits(userId));
    }

    @Override
    @PostMapping("confirmIncreaseRequest")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<FinanceIncreaseUserDepositDto> confirmIncreaseRequest(@RequestBody FinanceIncreaseUserDepositParam param) {
        return ResponseEntity.ok(IncreaseUserDepositService.confirmIncreaseRequest(param));
    }


}
