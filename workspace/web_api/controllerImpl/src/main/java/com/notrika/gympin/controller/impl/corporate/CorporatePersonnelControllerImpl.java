package com.notrika.gympin.controller.impl.corporate;

import com.notrika.gympin.common._base.param.BasePagedParam;
import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.corporate.corporatePersonnel.api.CorporatePersonnelController;
import com.notrika.gympin.common.corporate.corporate.param.CorporateParam;
import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelCreditDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.param.CorporatePersonnelCreditParam;
import com.notrika.gympin.common.corporate.corporatePersonnel.param.CorporatePersonnelParam;
import com.notrika.gympin.common.corporate.corporatePersonnel.service.CorporatePersonnelCreditService;
import com.notrika.gympin.common.corporate.corporatePersonnel.service.CorporatePersonnelService;
import com.notrika.gympin.common.user.param.UserParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/corporatePersonnel")
public class CorporatePersonnelControllerImpl implements CorporatePersonnelController {

    @Autowired
    private CorporatePersonnelService corporatePersonnelService;

    @Autowired
    private CorporatePersonnelCreditService corporatePersonnelCreditService;


    @Override
    public ResponseEntity<CorporatePersonnelDto> add(CorporatePersonnelParam corporatePersonnelParam) {
        return new ResponseEntity<>(corporatePersonnelService.add(corporatePersonnelParam),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<CorporatePersonnelDto> update(CorporatePersonnelParam corporatePersonnelParam) {
        return new ResponseEntity<>(corporatePersonnelService.update(corporatePersonnelParam),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<CorporatePersonnelDto> delete(CorporatePersonnelParam corporatePersonnelParam) {
        return new ResponseEntity<>(corporatePersonnelService.delete(corporatePersonnelParam),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<CorporatePersonnelDto>> getAll(BasePagedParam pagingParam) {
        return new ResponseEntity<>(corporatePersonnelService.getAll(pagingParam),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<CorporatePersonnelDto> getById(Long id) {
        return new ResponseEntity<>(corporatePersonnelService.getById(id),HttpStatus.OK);
    }

    @Override
    @GetMapping("PersonnelByCorporate")
    public ResponseEntity<List<CorporatePersonnelDto>> getPersonnelByCorporate(CorporateParam corporateParam) {
        return new ResponseEntity<>(corporatePersonnelService.getPersonnelByCorporate(corporateParam),HttpStatus.OK);
    }

    @Override
    @GetMapping("corporateByUserId")
    public ResponseEntity<List<CorporatePersonnelDto>> getCorporateByUser(UserParam userParam) {
        return new ResponseEntity<>(corporatePersonnelService.getByUserid(userParam.getId()),HttpStatus.OK);
    }

    @Override
    @GetMapping("corporateOwnedByUserId")
    public ResponseEntity<List<CorporatePersonnelDto>> getCorporateOwnedByUser(UserParam userParam) {
        return new ResponseEntity<>(corporatePersonnelService.getOwnedByUserid(userParam.getId()),HttpStatus.OK);
    }

    @Override
    @PostMapping("addPersonnelCredit")
    public ResponseEntity<CorporatePersonnelCreditDto> addPersonnelCredit(CorporatePersonnelCreditParam param) {
        return ResponseEntity.ok(corporatePersonnelCreditService.add(param));
    }

    @Override
    @PostMapping("addCreditToAll")
    public ResponseEntity<List<CorporatePersonnelCreditDto>> addToAllPersonnelCredit(CorporatePersonnelCreditParam param) {
        return ResponseEntity.ok(corporatePersonnelCreditService.addToAll(param));
    }

    @Override
    @GetMapping("getTotalUserCredits")
    public ResponseEntity<BigDecimal> getTotalUserCredits(CorporatePersonnelCreditParam param) {
        return ResponseEntity.ok(corporatePersonnelCreditService.getTotalUserCredits(param));
    }

    @Override
    public ResponseEntity<Page<CorporatePersonnelDto>> query(BaseQuery<?> param) {
        return null;
    }


}
