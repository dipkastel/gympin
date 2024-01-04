package com.notrika.gympin.controller.impl.corporate;

import com.notrika.gympin.common.finance.transaction.dto.CorporateTransactionDto;
import com.notrika.gympin.common.finance.transaction.dto.FinanceCorporateDto;
import com.notrika.gympin.common.finance.transaction.param.CorporateTransactionParam;
import com.notrika.gympin.common.finance.transaction.param.FinanceCorporateParam;
import com.notrika.gympin.common.finance.transaction.service.CorporateTransactionService;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.corporate.corporate.api.CorporateController;
import com.notrika.gympin.common.corporate.corporate.dto.CorporateDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelGroupDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.param.CorporatePersonnelGroupParam;
import com.notrika.gympin.common.corporate.corporate.param.CorporateLogoParam;
import com.notrika.gympin.common.corporate.corporate.param.CorporateParam;
import com.notrika.gympin.common.corporate.corporate.query.CorporateQuery;
import com.notrika.gympin.common.corporate.corporate.service.CorporateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/Corporate")
public class CorporateControllerImpl implements CorporateController {

    @Autowired
    private CorporateService corporateService;
    @Autowired
    private CorporateTransactionService corporateTransactionService;

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<CorporateDto> add(CorporateParam corporateParam) {
        return ResponseEntity.ok(corporateService.add(corporateParam));
    }

    @Override
    public ResponseEntity<CorporateDto> update(CorporateParam corporateParam) {
        return ResponseEntity.ok(corporateService.update(corporateParam));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<CorporateDto> delete(CorporateParam corporateParam) {
        return ResponseEntity.ok(corporateService.delete(corporateParam));
    }

    @Override
    public ResponseEntity<List<CorporateDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(corporateService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<CorporateDto> getById(Long id) {
        return ResponseEntity.ok(corporateService.getById(id));
    }

    @Override
    public ResponseEntity<Page<CorporateDto>> query(CorporateQuery param) {
        return ResponseEntity.ok(corporateService.query(param));
    }

    @Override
    @PutMapping("updateStatus")
    public ResponseEntity<CorporateDto> updateStatus(CorporateParam param) {
        return ResponseEntity.ok(corporateService.updateStatus(param));
    }

    @Override
    @PutMapping("updateStepPayment")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<CorporateDto> updateStepPayment(CorporateParam param) {
        return ResponseEntity.ok(corporateService.updateStepPayment(param));
    }

    @Override
    @PutMapping("updateLogo")
    public ResponseEntity<CorporateDto> updateLogo(CorporateLogoParam param) {
        return ResponseEntity.ok(corporateService.updateLogo(param));
    }

    @Override
    @GetMapping("getTransactions")
    public ResponseEntity<List<CorporateTransactionDto>> getTransactions(CorporateTransactionParam param) {
        return ResponseEntity.ok(corporateTransactionService.getByCorporate(param.getCorporateId()));
    }


    @Override
    @GetMapping("getCorporateGroups")
    public ResponseEntity<List<CorporatePersonnelGroupDto>> getCorporateGroups(CorporateParam corporateParam) {
        return ResponseEntity.ok(corporateService.getCorporateGroups(corporateParam));
    }

    @Override
    @GetMapping("getFinanceCorporate")
    public ResponseEntity<FinanceCorporateDto> getFinanceCorporate(FinanceCorporateParam param) {
        return ResponseEntity.ok(corporateService.getFinanceCorporate(param));
    }

    @Override
    @PostMapping("addGroup")
    public ResponseEntity<CorporatePersonnelGroupDto> addCorporateGroup(@RequestBody CorporatePersonnelGroupParam param) {
        return ResponseEntity.ok(corporateService.addGroup(param));
    }

    @Override
    @PutMapping("deleteGroup")
    public ResponseEntity<CorporatePersonnelGroupDto> deleteCorporateGroup(@RequestBody CorporatePersonnelGroupParam param) {
        return ResponseEntity.ok(corporateService.deleteGroup(param));
    }

}
