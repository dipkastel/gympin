package com.notrika.gympin.controller.impl.corporate;

import com.notrika.gympin.common._base.param.BasePagedParam;
import com.notrika.gympin.common.corporate.corporate.api.CorporateController;
import com.notrika.gympin.common.corporate.corporate.dto.CorporateDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelCategoryDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.param.CorporatePersonnelCategoryParam;
import com.notrika.gympin.common.transaction.dto.TransactionDto;
import com.notrika.gympin.common.corporate.corporate.param.CorporateLogoParam;
import com.notrika.gympin.common.corporate.corporate.param.CorporateParam;
import com.notrika.gympin.common.transaction.param.TransactionParam;
import com.notrika.gympin.common.corporate.corporate.query.CorporateQuery;
import com.notrika.gympin.common.corporate.corporate.service.CorporateService;
import com.notrika.gympin.common.transaction.service.TransactionService;
import com.notrika.gympin.common.user.param.UserParam;
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
    private TransactionService TransactionService;

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
    @PutMapping("updateLogo")
    public ResponseEntity<CorporateDto> updateLogo(CorporateLogoParam param) {
        return ResponseEntity.ok(corporateService.updateLogo(param));
    }

    @Override
    @GetMapping("getTransactions")
    public ResponseEntity<List<TransactionDto>> getTransactions(TransactionParam param) {
        return ResponseEntity.ok(TransactionService.getByCorporate(param.getCorporateId()));
    }

    @Override
    @GetMapping("getTotalDeposit")
    public ResponseEntity<BigDecimal> getTotalDeposit(TransactionParam param) {
        return ResponseEntity.ok(corporateService.getById(param.getCorporateId()).getBalance());
    }

    @Override
    @GetMapping("getCorporateCategories")
    public ResponseEntity<List<CorporatePersonnelCategoryDto>> getCorporateCategories(CorporateParam corporateParam) {
        return ResponseEntity.ok(corporateService.getCorporateCategories(corporateParam));
    }

    @Override
    @PostMapping("addCategory")
    public ResponseEntity<CorporatePersonnelCategoryDto> addCorporateCategory(CorporatePersonnelCategoryParam param) {
        return ResponseEntity.ok(corporateService.addCategory(param));
    }

    @Override
    @PutMapping("deleteCategory")
    public ResponseEntity<CorporatePersonnelCategoryDto> deleteCorporateCategory(CorporatePersonnelCategoryParam param) {
        return ResponseEntity.ok(corporateService.deleteCategory(param));
    }

}
