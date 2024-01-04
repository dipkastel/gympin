package com.notrika.gympin.controller.impl.finance.Settlement;


import com.notrika.gympin.common.finance.settlement.api.FinanceSettlementUserDepositController;
import com.notrika.gympin.common.finance.settlement.dto.FinanceSettlementUserDepositDto;
import com.notrika.gympin.common.finance.settlement.param.FinanceSettlementUserDepositParam;
import com.notrika.gympin.common.finance.settlement.query.FinanceSettlementUserDepositQuery;
import com.notrika.gympin.common.finance.settlement.service.FinanceSettlementUserDepositService;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/settlementUserDeposit")
public class FinanceSettlementUserDepositControllerImpl implements FinanceSettlementUserDepositController {


    @Autowired
    private FinanceSettlementUserDepositService settlementUserDepositService;

    @Override
    public ResponseEntity<FinanceSettlementUserDepositDto> add(FinanceSettlementUserDepositParam param) {
        return ResponseEntity.ok(settlementUserDepositService.add(param));
    }

    @Override
    public ResponseEntity<FinanceSettlementUserDepositDto> update(FinanceSettlementUserDepositParam param) {
        return ResponseEntity.ok(settlementUserDepositService.update(param));
    }

    @Override
    public ResponseEntity<FinanceSettlementUserDepositDto> delete(FinanceSettlementUserDepositParam param) {
        return ResponseEntity.ok(settlementUserDepositService.delete(param));
    }

    @Override
    public ResponseEntity<List<FinanceSettlementUserDepositDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(settlementUserDepositService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<FinanceSettlementUserDepositDto> getById(Long id) {
        return ResponseEntity.ok(settlementUserDepositService.getById(id));
    }

    @Override
    public ResponseEntity<Page<FinanceSettlementUserDepositDto>> query(FinanceSettlementUserDepositQuery param) {
        return ResponseEntity.ok(settlementUserDepositService.query(param));
    }


    @Override
    @GetMapping("getSettlementsByUser")
    public ResponseEntity<List<FinanceSettlementUserDepositDto>> getSettlementUserDeposits(Long userId) {
        return ResponseEntity.ok(settlementUserDepositService.getSettlementUserDeposits(userId));
    }

    @Override
    @PostMapping("confirmSettlementRequest")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<FinanceSettlementUserDepositDto> confirmSettlementRequest(@RequestBody FinanceSettlementUserDepositParam param) {
        return ResponseEntity.ok(settlementUserDepositService.confirmSettlementRequest(param));
    }


}
