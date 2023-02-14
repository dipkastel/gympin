package com.notrika.gympin.common.corporate.corporatePersonnel.api;

import com.notrika.gympin.common._base.base.BaseController;
import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelCreditDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.param.CorporatePersonnelCreditParam;
import com.notrika.gympin.common.corporate.corporatePersonnel.param.CorporatePersonnelParam;

import com.notrika.gympin.common.corporate.corporate.param.CorporateParam;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.math.BigDecimal;
import java.util.List;

public interface CorporatePersonnelController extends BaseController<CorporatePersonnelParam, CorporatePersonnelDto, BaseQuery<?>> {

    ResponseEntity<List<CorporatePersonnelDto>> getPersonnelByCorporate(CorporateParam corporateParam);
    ResponseEntity<CorporatePersonnelCreditDto> addPersonnelCredit(@RequestBody CorporatePersonnelCreditParam param);
    ResponseEntity<List<CorporatePersonnelCreditDto>> addToAllPersonnelCredit(@RequestBody CorporatePersonnelCreditParam param);
    ResponseEntity<BigDecimal> getTotalUserCredits(CorporatePersonnelCreditParam param);

}
