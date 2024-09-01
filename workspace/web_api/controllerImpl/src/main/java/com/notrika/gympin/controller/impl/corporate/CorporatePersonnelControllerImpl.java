package com.notrika.gympin.controller.impl.corporate;

import com.notrika.gympin.common.corporate.corporate.query.CorporateQuery;
import com.notrika.gympin.common.corporate.corporatePersonnel.param.CorporatePersonnelFileParam;
import com.notrika.gympin.common.corporate.corporatePersonnel.query.CorporatePersonnelQuery;
import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.multimedia.param.MultimediaStoreParam;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.corporate.corporatePersonnel.api.CorporatePersonnelController;
import com.notrika.gympin.common.corporate.corporate.param.CorporateParam;
import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelCreditDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.param.CorporatePersonnelCreditParam;
import com.notrika.gympin.common.corporate.corporatePersonnel.param.CorporatePersonnelParam;
import com.notrika.gympin.common.corporate.corporatePersonnel.service.CorporatePersonnelCreditService;
import com.notrika.gympin.common.corporate.corporatePersonnel.service.CorporatePersonnelService;
import com.notrika.gympin.common.user.user.param.UserParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

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
    public ResponseEntity<Page<CorporatePersonnelDto>> query(CorporatePersonnelQuery param) {
        return ResponseEntity.ok(corporatePersonnelService.query(param));
    }

    @Override
    @RequestMapping(path = "/addList", method = POST, consumes = {MediaType.ALL_VALUE})
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<List<CorporatePersonnelDto>> addList(CorporatePersonnelFileParam param) {
        return new ResponseEntity<>(corporatePersonnelService.addList(param),HttpStatus.OK);
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
    @PostMapping("decreaseCredit")
    public ResponseEntity<CorporatePersonnelCreditDto> decreaseUserCredit(CorporatePersonnelCreditParam param) {
        return ResponseEntity.ok(corporatePersonnelCreditService.decreasePersonnelCredit(param));
    }

    @Override
    @PostMapping("manualExpireCredit")
    public ResponseEntity<CorporatePersonnelCreditDto> manualExpireUserCredit(CorporatePersonnelCreditParam param) {
        return ResponseEntity.ok(corporatePersonnelCreditService.ExpirePersonnelCredit(param));
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



}
