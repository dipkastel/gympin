package com.notrika.gympin.controller.impl.corporate;

import com.notrika.gympin.common.corporate.corporate.param.*;
import com.notrika.gympin.common.finance.transaction.dto.CorporateTransactionDto;
import com.notrika.gympin.common.finance.transaction.dto.FinanceCorporateDto;
import com.notrika.gympin.common.finance.transaction.param.CorporateTransactionParam;
import com.notrika.gympin.common.finance.transaction.param.FinanceCorporateParam;
import com.notrika.gympin.common.finance.transaction.service.CorporateTransactionService;
import com.notrika.gympin.common.settings.corporateSettings.dto.CorporateSettingDto;
import com.notrika.gympin.common.settings.corporateSettings.param.CorporateSettingParam;
import com.notrika.gympin.common.settings.corporateSettings.service.corporateSettingsService;
import com.notrika.gympin.common.user.user.dto.InviteCode;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.corporate.corporate.api.CorporateController;
import com.notrika.gympin.common.corporate.corporate.dto.CorporateDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelGroupDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.param.CorporatePersonnelGroupParam;
import com.notrika.gympin.common.corporate.corporate.query.CorporateQuery;
import com.notrika.gympin.common.corporate.corporate.service.CorporateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
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
    private corporateSettingsService corporateSettingsService;
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
    @PutMapping("updateContractType")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<CorporateDto> updateContractType(CorporateContractTypeParam param) {
        return ResponseEntity.ok(corporateService.updateContractType(param));
    }

    @Override
    @PutMapping("updateContractDate")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<CorporateDto> updateContractDate(CorporateContractDateParam param) {
        return ResponseEntity.ok(corporateService.updateContractDate(param));
    }
    @Override
    @PutMapping("updateDefaultExpireDuration")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<CorporateDto> updateDefaultExpireDuration(CorporateDedParam param) {
        return ResponseEntity.ok(corporateService.updateDed(param));
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
    @PostMapping("getTotalIncreases")
    public ResponseEntity<BigDecimal> getTotalIncreases(CorporateTransactionParam param) {
        return ResponseEntity.ok(corporateTransactionService.getCorporateTotalIncreases(param));
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

    @Override
    @PostMapping("/updateContract")
    public ResponseEntity<CorporateDto> updateContract(CorporateParam param) {
        return ResponseEntity.ok(corporateService.updateContract(param));
    }

    @Override
    @PostMapping("/signContract")
    public ResponseEntity<CorporateDto> signContract(CorporateParam param) {
        return ResponseEntity.ok(corporateService.signContract(param));
    }

    @Override
    @PostMapping("/sendContractCode")
    public ResponseEntity<Boolean> sendContractCode(CorporateContractSmsParam param) {
        return new ResponseEntity<>(corporateService.sendContractCode(param), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getCorporateSettings")
    public ResponseEntity<List<CorporateSettingDto>> getCorporateSettings(CorporateSettingParam corporateSettingParam) {
        return ResponseEntity.ok(corporateSettingsService.getCorporateSettings(corporateSettingParam.getId()));
    }
    @Override
    @GetMapping("/getAffiliateCode")
    public ResponseEntity<InviteCode> getCorporateAffiliateCode(CorporateParam corporateParam) {
        return ResponseEntity.ok(corporateService.getAffiliateCode(corporateParam.getId()));
    }

    @Override
    @PostMapping("/setCorporateSettings")
    public ResponseEntity<CorporateSettingDto> SetCorporateSettings(CorporateSettingParam corporateSettingParam) {
        CorporateSettingDto corporateSettingDto;
        if(corporateSettingParam.getId()!=null){
            corporateSettingDto = corporateSettingsService.update(corporateSettingParam);
        }else{
            corporateSettingDto = corporateSettingsService.add(corporateSettingParam);
        }
        return ResponseEntity.ok(corporateSettingDto);
    }

}
