package com.notrika.gympin.controller.impl.corporate;

import com.notrika.gympin.common._base.param.BasePagedParam;
import com.notrika.gympin.common.corporate.corporate.api.CorporateController;
import com.notrika.gympin.common.corporate.corporate.dto.CorporateDto;
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
    public ResponseEntity<CorporateDto> add(CorporateParam corporateParam) {
        return ResponseEntity.ok(corporateService.add(corporateParam));
    }

    @Override
    public ResponseEntity<CorporateDto> update(CorporateParam corporateParam) {
        return ResponseEntity.ok(corporateService.update(corporateParam));
    }

    @Override
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
    @GetMapping("getByUser")
    public ResponseEntity<List<CorporateDto>> getByUser(UserParam userParam) {
        return ResponseEntity.ok(corporateService.getByUser(userParam));
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
}